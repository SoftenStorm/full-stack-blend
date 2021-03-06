import {CodeHelper} from '../../helpers/CodeHelper';
import {FontHelper} from '../../helpers/FontHelper';
import {HTMLHelper} from '../../helpers/HTMLHelper';
import {TextHelper} from '../../helpers/TextHelper';
import {RandomHelper} from '../../helpers/RandomHelper';
import {Accessories, EditorHelper} from './EditorHelper';
import {CapabilityHelper} from './CapabilityHelper';
import {StylesheetHelper} from './StylesheetHelper';
import {AnimationHelper} from './AnimationHelper';
import {CursorHelper} from './CursorHelper';
import {FrontEndDOMHelper} from './FrontEndDOMHelper';
import {BackEndDOMHelper} from './BackEndDOMHelper';
import {SchemaHelper} from './SchemaHelper';
import {LayoutHelper} from './LayoutHelper';
import {TimelineHelper} from './TimelineHelper';
import {StatusHelper} from './StatusHelper';
import {MalformationRepairHelper} from './MalformationRepairHelper';
import {ALL_RESPONSIVE_SIZE_REGEX, ALL_RESPONSIVE_OFFSET_REGEX, FORWARD_STYLE_TO_CHILDREN_CLASS_LIST, INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES, INHERITING_COMPONENT_RESERVED_STYLE_NAMES, BACKEND_DATA_EXTENSIONS} from '../../Constants';

declare let js_beautify;
declare let css_beautify;
declare let html_beautify;

const merging_beautify = (beautified_content: string) => {
	if (!beautified_content) return beautified_content;
	
	return beautified_content.replace(/\n[ \t]+</g, '\n<').replace(/></g, '>\n<').replace(/ ([a-zA-Z0-9\_\-]+=")/g, '\n    $1');
};

let cacheOfGeneratedFrontEndCodeForAllPages: any = {};
let cacheOfGeneratedBackEndCodeForAllPages: any = {};

const DefaultProjectSettings: {[Identifier: string]: any} = {
  currentMode: 'site',
  externalLibraries: 'react@16',
  colorSwatches: new Array(28),
  editingPageID: 'index',
  editingComponentID: null,
  editingPopupID: null,
  editingAnimationID: null,
  editingKeyframeID: null,
  editingSelector: null,
  pages: [{id: 'index', name: 'Home', path: '/', state: 'create'}],
  components: [],
  popups: []
};
let InternalProjectSettings = CodeHelper.clone(DefaultProjectSettings);
let InternalSites = {};
let InternalComponents = {};
let InternalPopups = {};
let InternalDataFlows = {};
let InternalServices = {};
let InternalStylesheets = {};
let InternalAnimations = {};
let backEndControllerBlobSHADict = {};
let frontEndComponentsBlobSHADict = {};
let viewBlobSHADict = {};
let routeBlobSHA = null;
let controllerBlobSHA = null;
let siteBundleBlobSHA = null;
let version = 1.3;

const DEFAULT_FLOW_PAGE_HTML = `<body><div class="container-fluid internal-fsb-begin" internal-fsb-guid="0"><div class="row internal-fsb-strict-layout internal-fsb-begin-layout internal-fsb-allow-cursor"></div></div></body>`.split('\n');
const DEFAULT_SINGLE_ITEM_EDITING_HTML = `<body><div class="container-fluid internal-fsb-begin" internal-fsb-guid="0"><div class="row internal-fsb-strict-layout internal-fsb-begin-layout"></div></div></body>`.split('\n');
const DEFAULT_ABSOLUTE_PAGE_HTML = `<body class="internal-fsb-disabled-guide"><div class="container-fluid internal-fsb-begin" internal-fsb-guid="0" style="height: 100%;"><div class="row internal-fsb-absolute-layout internal-fsb-begin-layout internal-fsb-allow-cursor" style="height: 100%;"></div></div></body>`.split('\n');
const DEFAULT_COMPONENT_HTML = `<div class="col-4 internal-fsb-element" internal-fsb-name="Container" internal-fsb-event-no-propagate="1" internal-fsb-class="FlowLayout" internal-fsb-react-mode="Site"><div class="container-fluid" internal-fsb-event-no-propagate="1"><div class="row internal-fsb-strict-layout internal-fsb-allow-cursor"></div></div></div>`.split('\n');
const DEFAULT_POPUP_HTML = `<div class="internal-fsb-element" internal-fsb-class="Popup" style="height: 100vh; left: 0px; position: fixed; top: 0px; width: 100vw" internal-fsb-event-no-propagate="1" internal-fsb-name="Container" internal-fsb-react-mode="Site"><div class="container-fluid" internal-fsb-event-no-propagate="1"><div class="internal-fsb-allow-cursor internal-fsb-strict-layout row"></div></div></div>`.split('\n');
const DEFAULT_PAGE_EXTENSIONS = {};

var WorkspaceHelper = {
  generateWorkspaceData: (removeSHADict: boolean=false) => {
    WorkspaceHelper.saveWorkspaceData(false, true);
    
    let clonedInternalProjectSettings = CodeHelper.clone(InternalProjectSettings);
    for (let key of BACKEND_DATA_EXTENSIONS) {
      delete clonedInternalProjectSettings[key];
    }
    
    clonedInternalProjectSettings.currentMode = 'site';
    clonedInternalProjectSettings.editingPageID = 'index';
    clonedInternalProjectSettings.editingComponentID = null;
    clonedInternalProjectSettings.editingPopupID = null;
	  clonedInternalProjectSettings.editingAnimationID = null;
	  clonedInternalProjectSettings.editingKeyframeID = null;
	  clonedInternalProjectSettings.editingSelector = null;
    
    let clonedInternalSites = CodeHelper.clone(InternalSites);
    for (let key in clonedInternalSites) {
  		if (clonedInternalSites.hasOwnProperty(key)) {
  			clonedInternalSites[key].accessories = {};
  		}
  	}
    
    return Object.assign(
    	{
	    	version: version,
	      globalSettings: clonedInternalProjectSettings,
	      sites: clonedInternalSites,
	      components: InternalComponents,
	      popups: InternalPopups,
	      flows: InternalDataFlows,
	      services: InternalServices,
	      stylesheets: StylesheetHelper.generateStylesheetData(),
	      animations: AnimationHelper.generateStylesheetData()
	    }, removeSHADict ? {} : {
	      backEndControllerBlobSHADict: backEndControllerBlobSHADict,
	      frontEndComponentsBlobSHADict: frontEndComponentsBlobSHADict,
	      viewBlobSHADict: viewBlobSHADict,
				routeBlobSHA: routeBlobSHA,
				controllerBlobSHA: controllerBlobSHA,
				siteBundleBlobSHA: siteBundleBlobSHA
	    }
   	);
  },
  initializeWorkspaceData: (data: any) => {
    InternalProjectSettings = data && data.globalSettings || DefaultProjectSettings;
    InternalSites = data && data.sites || {};
    InternalComponents = data && data.components || {};
    InternalPopups = data && data.popups || {};
    InternalDataFlows = data && data.flows || {};
    InternalServices = data && data.services || {};
    InternalStylesheets = data && data.stylesheets || {};
    InternalAnimations = data && data.animations || {};
    InternalDataFlows.schema = InternalDataFlows.schema || {};
    
    backEndControllerBlobSHADict = data.backEndControllerBlobSHADict || {};
    frontEndComponentsBlobSHADict = data.frontEndComponentsBlobSHADict || {};
    viewBlobSHADict = data.viewBlobSHADict || {};
    routeBlobSHA = data.routeBlobSHA || null;
    controllerBlobSHA = data.controllerBlobSHA || null;
    siteBundleBlobSHA = data.siteBundleBlobSHA || null;
    
    InternalProjectSettings.currentMode = 'site';
    
    if (data) {
      if (!data.version || data.version == 1) {
        for (let key in InternalSites) {
          if (InternalSites.hasOwnProperty(key)) {
            InternalSites[key].body = html_beautify(InternalSites[key].body || '').split('\n');
          }
        }
        for (let key in InternalComponents) {
          if (InternalComponents.hasOwnProperty(key)) {
            InternalComponents[key].html = html_beautify(InternalComponents[key].html || '').split('\n');
          }
        }
        for (let key in InternalPopups) {
          if (InternalPopups.hasOwnProperty(key)) {
            InternalPopups[key].html = html_beautify(InternalPopups[key].html || '').split('\n');
          }
        }
        InternalDataFlows.default = html_beautify(InternalDataFlows.default || DEFAULT_ABSOLUTE_PAGE_HTML).split('\n');
        InternalServices.default = html_beautify(InternalServices.default || DEFAULT_ABSOLUTE_PAGE_HTML).split('\n');
      }
      if (!data.version || data.version <= 1.1) {
        for (let key in InternalSites) {
          if (InternalSites.hasOwnProperty(key)) {
            for (let extension of BACKEND_DATA_EXTENSIONS) {
              if (InternalSites[key].extensions && InternalSites[key].extensions.hasOwnProperty(extension)) {
                InternalSites[key].extensions[extension] = InternalSites[key].extensions[extension] &&
                	InternalSites[key].extensions[extension].split('\n') || null;
              }
            }
          }
        }
        for (let key in InternalComponents) {
          if (InternalComponents.hasOwnProperty(key)) {
            for (let extension of BACKEND_DATA_EXTENSIONS) {
              if (InternalComponents[key].extensions && InternalComponents[key].extensions.hasOwnProperty(extension)) {
                InternalComponents[key].extensions[extension] = InternalComponents[key].extensions[extension] &&
                	InternalComponents[key].extensions[extension].split('\n') || null;
              }
            }
          }
        }
        for (let key in InternalPopups) {
          if (InternalPopups.hasOwnProperty(key)) {
            for (let extension of BACKEND_DATA_EXTENSIONS) {
              if (InternalPopups[key].extensions && InternalPopups[key].extensions.hasOwnProperty(extension)) {
                InternalPopups[key].extensions[extension] = InternalPopups[key].extensions[extension] &&
                	InternalPopups[key].extensions[extension].split('\n') || null;
              }
            }
          }
        }
      }
      if (!data.version || data.version <= 1.2) {
      	if (InternalDataFlows.default.join('') === '') InternalDataFlows.default = CodeHelper.clone(DEFAULT_ABSOLUTE_PAGE_HTML);
      	if (InternalServices.default.join('') === '') InternalServices.default = CodeHelper.clone(DEFAULT_ABSOLUTE_PAGE_HTML);
      }
    }
    
    WorkspaceHelper.loadWorkspaceData();
    EditorHelper.updateEditorProperties();
  },
  setMode: (mode: string) => {
  	if (InternalProjectSettings.currentMode == mode) return;
  
    WorkspaceHelper.saveWorkspaceData(false);
    InternalProjectSettings.currentMode = mode;
    WorkspaceHelper.loadWorkspaceData(true);
  },
  getEditable: () => {
    if (InternalProjectSettings.currentMode == 'site') {
      return (InternalProjectSettings.editingPageID != null) ? 'site' : false;
    } else if (InternalProjectSettings.currentMode == 'components') {
      return (InternalProjectSettings.editingComponentID != null || InternalProjectSettings.components.filter(component => component.state != 'delete').length != 0) ? 'components' : false;
    } else if (InternalProjectSettings.currentMode == 'popups') {
      return (InternalProjectSettings.editingPopupID != null || InternalProjectSettings.popups.filter(popup => popup.state != 'delete').length != 0) ? 'popups' : false;
    } else if (InternalProjectSettings.currentMode == 'data') {
      return 'data';
    } else if (InternalProjectSettings.currentMode == 'services') {
      return 'services';
    }
  },
  getAllUsingFonts: () => {
    let usingFonts = {};
    
    for (let key in InternalSites) {
      if (InternalSites.hasOwnProperty(key)) {
        let page = WorkspaceHelper.getPageData(key);
        if (page == null) continue;
        
        Object.assign(usingFonts, page.head.fonts || {});
      }
    }
    
    return usingFonts;
  },
  loadWorkspaceData: (updateUI: boolean=false) => {
    if (InternalProjectSettings.currentMode == 'site') {
      if (InternalProjectSettings.editingPageID == null) return;
      
      let page = WorkspaceHelper.getPageData(InternalProjectSettings.editingPageID);
      if (page == null) return;
      
      WorkspaceHelper.replaceBodyOuterHTML(page.body.join('\n'));
      
      for (let key of BACKEND_DATA_EXTENSIONS) {
      	delete InternalProjectSettings[key];
      	if (page.extensions[key]) {
      		InternalProjectSettings[key] = page.extensions[key];
      	}
      }
      
      for (let key of BACKEND_DATA_EXTENSIONS) {
      	if (page.extensions.hasOwnProperty(key)) {
        	InternalProjectSettings[key] = page.extensions[key] && page.extensions[key].join('\n') || null;
        }
      }
      
      WorkspaceHelper.updateInPageComponents();
      WorkspaceHelper.updateInheritingComponents();
      MalformationRepairHelper.repair();
      
      FontHelper.initializeFontData(page.head.fonts);
      StylesheetHelper.initializeStylesheetData(InternalStylesheets);
      AnimationHelper.initializeStylesheetData(InternalAnimations);
      
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings').disabled = true;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-1').disabled = true;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-2').disabled = true;
      Accessories.overlay.setEnable(false);
      
      EditorHelper.init(true, updateUI);
    } else if (InternalProjectSettings.currentMode == 'data') {
    	WorkspaceHelper.replaceBodyOuterHTML((InternalDataFlows.default || DEFAULT_ABSOLUTE_PAGE_HTML).join('\n'));
      
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings').disabled = false;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-1').disabled = false;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-2').disabled = false;
      Accessories.overlay.setEnable(true);
      
      EditorHelper.init(false, updateUI);
    } else if (InternalProjectSettings.currentMode == 'services') {
    	WorkspaceHelper.replaceBodyOuterHTML((InternalServices.default || DEFAULT_ABSOLUTE_PAGE_HTML).join('\n'));
      
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings').disabled = false;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-1').disabled = false;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-2').disabled = false;
      Accessories.overlay.setEnable(false);
      
      EditorHelper.init(false, updateUI);
    } else if (InternalProjectSettings.currentMode == 'components') {
    	if (InternalProjectSettings.editingComponentID == null) return;
      
      let component = WorkspaceHelper.getComponentData(InternalProjectSettings.editingComponentID);
      if (component == null) return;
      
      WorkspaceHelper.replaceBodyOuterHTML((DEFAULT_SINGLE_ITEM_EDITING_HTML).join('\n'));
      document.body.firstElementChild.firstElementChild.innerHTML = (component.html || DEFAULT_COMPONENT_HTML).join('\n');
      
      HTMLHelper.setAttribute(document.body.firstElementChild.firstElementChild.firstElementChild, 'internal-fsb-guid', InternalProjectSettings.editingComponentID);
      
      WorkspaceHelper.updateInPageComponents();
      WorkspaceHelper.updateInheritingComponents();
      MalformationRepairHelper.repair();
      
      FontHelper.initializeFontData(WorkspaceHelper.getAllUsingFonts());
      StylesheetHelper.initializeStylesheetData(InternalStylesheets);
      AnimationHelper.initializeStylesheetData(InternalAnimations);
      
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings').disabled = true;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-1').disabled = true;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-2').disabled = true;
      Accessories.overlay.setEnable(false);
      
      EditorHelper.init(false, updateUI);
    } else if (InternalProjectSettings.currentMode == 'popups') {
      if (InternalProjectSettings.editingPopupID == null) return;
      
      let popup = WorkspaceHelper.getPopupData(InternalProjectSettings.editingPopupID);
      if (popup == null) return;
      
      WorkspaceHelper.replaceBodyOuterHTML((DEFAULT_SINGLE_ITEM_EDITING_HTML).join('\n'));
      document.body.firstElementChild.firstElementChild.innerHTML = (popup.html || DEFAULT_POPUP_HTML).join('\n');
      
      HTMLHelper.setAttribute(document.body.firstElementChild.firstElementChild.firstElementChild, 'internal-fsb-guid', InternalProjectSettings.editingPopupID);
      
      WorkspaceHelper.updateInPageComponents();
      WorkspaceHelper.updateInheritingComponents();
      MalformationRepairHelper.repair();
      
      FontHelper.initializeFontData(WorkspaceHelper.getAllUsingFonts());
      StylesheetHelper.initializeStylesheetData(InternalStylesheets);
      AnimationHelper.initializeStylesheetData(InternalAnimations);
      
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings').disabled = true;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-1').disabled = true;
      HTMLHelper.getElementById('internal-fsb-stylesheet-settings-font-2').disabled = true;
      Accessories.overlay.setEnable(false);
      
      EditorHelper.init(false, updateUI);
    }
    
    WorkspaceHelper.migrateCode();
    
    LayoutHelper.invalidate();
    TimelineHelper.invalidate();
    SchemaHelper.invalidate();
    StatusHelper.invalidate();
  },
  saveWorkspaceData: (reinit: boolean=true, force: boolean=false) => {
  	HTMLHelper.sortAttributes();
  	
    if (InternalProjectSettings.currentMode == 'site') {
      if (InternalProjectSettings.editingPageID == null) return;
      
      let page = WorkspaceHelper.getPageData(InternalProjectSettings.editingPageID);
      let clonedPage = CodeHelper.clone(page);
      
      page.head.fonts = FontHelper.generateFontData();
      
      let selectingElement = EditorHelper.getSelectingElement();
      page.accessories.selectingElementGUID = selectingElement && HTMLHelper.getAttribute(selectingElement, 'internal-fsb-guid');
      page.accessories.currentCursorWalkPath = CursorHelper.findWalkPathForCursor();
      
      EditorHelper.detach();
      page.body = merging_beautify(html_beautify(TextHelper.removeMultipleBlankLines(WorkspaceHelper.cleanupPageHTMLData(document.body.outerHTML)))).split('\n');
      
      page.extensions = {};
      for (let key of BACKEND_DATA_EXTENSIONS) {
      	if (InternalProjectSettings.hasOwnProperty(key)) {
        	page.extensions[key] = InternalProjectSettings[key] && InternalProjectSettings[key].split('\n') || null;
        }
      }
      
      page.notations = SchemaHelper.generateTreeOfDotNotations();
      page.automaticSchemata = SchemaHelper.generateAutomaticSchemata();
      
      if (reinit) {
        EditorHelper.init(true, false);
        
        FontHelper.initializeFontData(page.head.fonts);
      	StylesheetHelper.initializeStylesheetData(InternalStylesheets);
      	AnimationHelper.initializeStylesheetData(InternalAnimations);
      }
      
      if (force || !CodeHelper.equals(clonedPage, page)) {
      	cacheOfGeneratedFrontEndCodeForAllPages[WorkspaceHelper.getCurrentGenerateFrontEndCodeKey()] = WorkspaceHelper.generateFrontEndCodeForCurrentPage();
      	cacheOfGeneratedBackEndCodeForAllPages[InternalProjectSettings.editingPageID] = WorkspaceHelper.generateBackEndCodeForCurrentPage();
      }
    } else if (InternalProjectSettings.currentMode == 'data') {
      EditorHelper.detach();
      InternalDataFlows.default = merging_beautify(html_beautify(TextHelper.removeMultipleBlankLines(WorkspaceHelper.cleanupPageHTMLData(document.body.outerHTML)))).split('\n');
      Accessories.overlay.setEnable(true);
      
      InternalDataFlows.schema = SchemaHelper.generateDataSchema();
      
      if (reinit) {
        EditorHelper.init(true, false);
      }
    } else if (InternalProjectSettings.currentMode == 'services') {
      EditorHelper.detach();
      InternalServices.default = merging_beautify(html_beautify(TextHelper.removeMultipleBlankLines(WorkspaceHelper.cleanupPageHTMLData(document.body.outerHTML)))).split('\n');
      
      if (reinit) {
        EditorHelper.init(true, false);
      }
    } else if (InternalProjectSettings.currentMode == 'components') {
    	if (InternalProjectSettings.editingComponentID == null) return;
    	
    	let component = WorkspaceHelper.getComponentData(InternalProjectSettings.editingComponentID);
    	let previous = component.html;
    	
    	const element = HTMLHelper.getElementsByClassName('internal-fsb-element')[0];
    	
      component.html = merging_beautify(html_beautify(TextHelper.removeMultipleBlankLines(WorkspaceHelper.cleanupComponentHTMLData(element.outerHTML)))).split('\n');
      component.namespace = HTMLHelper.getAttribute(element, 'internal-fsb-react-namespace') || 'Project.Controls';
      component.klass = HTMLHelper.getAttribute(element, 'internal-fsb-react-class') ||
      	(HTMLHelper.getAttribute(element, 'internal-fsb-class') + '_' + HTMLHelper.getAttribute(element, 'internal-fsb-guid'));
      
      if (reinit) {
        EditorHelper.init(true, false);
        
        FontHelper.initializeFontData(WorkspaceHelper.getAllUsingFonts());
      	StylesheetHelper.initializeStylesheetData(InternalStylesheets);
      	AnimationHelper.initializeStylesheetData(InternalAnimations);
      }
      
      if (force || component.html != previous) {
      	cacheOfGeneratedFrontEndCodeForAllPages[WorkspaceHelper.getCurrentGenerateFrontEndCodeKey()] = WorkspaceHelper.generateFrontEndCodeForCurrentPage();
      }
    } else if (InternalProjectSettings.currentMode == 'popups') {
      if (InternalProjectSettings.editingPopupID == null) return;
    	
    	let popup = WorkspaceHelper.getPopupData(InternalProjectSettings.editingPopupID);
    	let previous = popup.html;
    	
    	const element = HTMLHelper.getElementsByClassName('internal-fsb-element')[0];
    	
      popup.html = merging_beautify(html_beautify(TextHelper.removeMultipleBlankLines(WorkspaceHelper.cleanupComponentHTMLData(element.outerHTML)))).split('\n');
      popup.namespace = HTMLHelper.getAttribute(element, 'internal-fsb-react-namespace') || 'Project.Controls';
      popup.klass = HTMLHelper.getAttribute(element, 'internal-fsb-react-class') ||
      	(HTMLHelper.getAttribute(element, 'internal-fsb-class') + '_' + HTMLHelper.getAttribute(element, 'internal-fsb-guid'));
      
      if (reinit) {
        EditorHelper.init(true, false);
        
        FontHelper.initializeFontData(WorkspaceHelper.getAllUsingFonts());
      	StylesheetHelper.initializeStylesheetData(InternalStylesheets);
      	AnimationHelper.initializeStylesheetData(InternalAnimations);
      }
      
      if (force || popup.html != previous) {
      	cacheOfGeneratedFrontEndCodeForAllPages[WorkspaceHelper.getCurrentGenerateFrontEndCodeKey()] = WorkspaceHelper.generateFrontEndCodeForCurrentPage();
      }
    }
  },
  replaceBodyOuterHTML: (html: string) => {
    while(document.body.attributes.length > 0) document.body.removeAttribute(document.body.attributes[0].name);
    
    const container = document.createElement('div');
    container.innerHTML = html.replace(/^\<body/, '<div').replace(/body\>$/, 'div>');
    
    while(container.firstChild.attributes.length > 0) {
      document.body.setAttribute(container.firstChild.attributes[0].name, container.firstChild.attributes[0].value);
      container.firstChild.removeAttribute(container.firstChild.attributes[0].name);
    }
    
    while(document.body.children.length != 0) document.body.removeChild(document.body.firstChild);
    while(container.firstChild.children.length != 0) document.body.appendChild(container.firstChild.firstChild);
  },
  removeComponentData: (id: string) => {
    delete InternalComponents[id];
    InternalProjectSettings.components = InternalProjectSettings.components.filter(component => component.id != id);
  },
  addOrReplaceComponentData: (id: string, name: string, namespace: string, klass: string, html: string) => {
  	InternalComponents[id] = {
      namespace: namespace,
      klass: klass,
      html: merging_beautify(html_beautify(TextHelper.removeMultipleBlankLines(WorkspaceHelper.cleanupComponentHTMLData(html || '')))).split('\n')
    };
    
    let existingComponentInfo = InternalProjectSettings.components.filter(component => component.id == id)[0];
    if (!existingComponentInfo) {
      InternalProjectSettings.components.push({
        id: id,
        name: name,
        state: 'create'
      });
    }
    
    WorkspaceHelper.updateInheritingComponents();
  },
  cleanupComponentHTMLData: (html: string) => {
  	let holder = document.createElement('div');
    holder.innerHTML = html;
    
    let accessories = [...HTMLHelper.getElementsByClassName('internal-fsb-accessory', holder)];
    accessories.forEach(accessory => accessory.parentNode.removeChild(accessory));
    
    let components = [...HTMLHelper.getElementsByAttribute('internal-fsb-inheriting', holder)].reverse();
    for (let component of components) {
    	component.innerHTML = '';
    }
    
    const selecting = HTMLHelper.getElementByClassName('internal-fsb-selecting', holder);
    if (selecting) HTMLHelper.removeClass(selecting, 'internal-fsb-selecting');
    
    return holder.innerHTML;
  },
  cleanupPageHTMLData: (html: string, preview: boolean=false) => {
  	let holder = document.createElement('iframe');
  	document.body.appendChild(holder);
  	
  	let holderWindow = holder.contentWindow || holder.contentDocument.document || holder.contentDocument;
  	
    holderWindow.document.open('text/htmlreplace');
    holderWindow.document.write(`<html><head></head>${html}</html>`);
    holderWindow.document.close();
    
    let accessories = [...HTMLHelper.getElementsByClassName('internal-fsb-accessory', holderWindow.document)];
    accessories.forEach(accessory => accessory.parentNode.removeChild(accessory));
    
    let components = [...HTMLHelper.getElementsByAttribute('internal-fsb-inheriting', holderWindow.document)].reverse();
    for (let component of components) {
    	component.innerHTML = '';
    }
    
    components = [...HTMLHelper.getElementsByAttributeNameAndValue('internal-fsb-react-mode', 'Site', holderWindow.document), ...HTMLHelper.getElementsByAttributeNameAndValue('internal-fsb-react-mode', 'Global', holderWindow.document)].reverse();
    for (let component of components) {
    	component.innerHTML = '';
    	
    	let attributes = [...component.attributes || []].reverse();
    	for (let attribute of attributes) {
    		if (attribute.name.indexOf('internal-fsb-') != -1 && INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES.indexOf(attribute.name) == -1) {
    			HTMLHelper.removeAttribute(component, attribute.name);
    		}
    	}
    }
    
    const selecting = HTMLHelper.getElementByClassName('internal-fsb-selecting', holder);
    if (selecting) HTMLHelper.removeClass(selecting, 'internal-fsb-selecting');
    
    document.body.removeChild(holder);
    
    return holderWindow.document.body.outerHTML;
  },
  migrateCode: () => {
  	let element = document.getElementById('internal-fsb-stylesheet');
  	if (element) element.className = 'internal-fsb-accessory';
  },
  recursiveCleanupComponentPreviewDOM: (element: HTMLElement, first: boolean=false) => {
  	if (!first) {
	    if (HTMLHelper.hasClass(element, 'internal-fsb-element')) {
	    	HTMLHelper.addClass(element, 'internal-fsb-inheriting-element');
	  		HTMLHelper.removeClass(element, 'internal-fsb-element');
	    }
	    HTMLHelper.removeClass(element, 'internal-fsb-allow-cursor');
	    HTMLHelper.removeAttribute(element, 'internal-fsb-react-mode');
	    HTMLHelper.removeAttribute(element, 'internal-fsb-react-command');
	    HTMLHelper.removeAttribute(element, 'internal-fsb-react-namespace');
	    HTMLHelper.removeAttribute(element, 'internal-fsb-react-class');
	    HTMLHelper.removeAttribute(element, 'internal-fsb-react-id');
	    HTMLHelper.removeAttribute(element, 'internal-fsb-react-data');
	    
	    if (HTMLHelper.getElementsByAttributeNameAndValue('internal-fsb-guid', HTMLHelper.getAttribute(element, 'internal-fsb-guid')).length > 1) {
	    	HTMLHelper.removeAttribute(element, 'internal-fsb-class');
	    	HTMLHelper.removeAttribute(element, 'internal-fsb-guid');
	    }
	    
	    HTMLHelper.removeAttribute(element, 'internal-fsb-inheriting');
  	}
  	
  	let elements = [...element.children];
  	for (let _element of elements) {
    	WorkspaceHelper.recursiveCleanupComponentPreviewDOM(_element);
	  }
  },
  updateInPageComponents: () => {
    for (let _component of InternalProjectSettings.components) {
      let component = HTMLHelper.getElementByAttributeNameAndValue('internal-fsb-guid', _component.id);
      if (component && (InternalProjectSettings.currentMode != 'components' || component != document.body.firstElementChild.firstElementChild.firstElementChild)) {
	      let componentInfo = WorkspaceHelper.getComponentData(_component.id);
	      if (componentInfo) {
		      let element = document.createElement('div');
		      let parentNode = component.parentNode;
		      element.innerHTML = (componentInfo.html || DEFAULT_COMPONENT_HTML).join('\n');
		      let firstElementChild = element.firstElementChild;
		      parentNode.insertBefore(firstElementChild, component);
		      parentNode.removeChild(component);
	      }
	    }
    }
 	},
  updateInheritingComponents: (container: HTMLElement=document.body) => {
    let components = [...HTMLHelper.getElementsByAttribute('internal-fsb-inheriting', container)];
    let selectedElement = EditorHelper.getSelectingElement();
    
    for (let component of components) {
    	let isSelecting = (component == selectedElement);
      let reservedAttributeValues = INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES.map((name) => {
        return HTMLHelper.getAttribute(component, name);
      });
      
      let componentInfo = WorkspaceHelper.getComponentData(reservedAttributeValues[0]);
      if (!componentInfo) continue;
      
      let isForwardingStyleToChildren = (FORWARD_STYLE_TO_CHILDREN_CLASS_LIST.indexOf(HTMLHelper.getAttribute(component, 'internal-fsb-class')) != -1);
      
      let element = document.createElement('div');
      let parentNode = component.parentNode;
      element.innerHTML = WorkspaceHelper.cleanupComponentHTMLData((componentInfo.html || DEFAULT_COMPONENT_HTML).join('\n'));
      let firstElementChild = element.firstElementChild;
      parentNode.insertBefore(firstElementChild, component);
      parentNode.removeChild(component);
      component = firstElementChild;
      
      for (let i=0; i<INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES.length; i++) {
        if (reservedAttributeValues[i]) {
	        if (INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES[i] == 'class') {
	          let previous = reservedAttributeValues[i];
	          let next = HTMLHelper.getAttribute(component, 'class') || '';
	          
	          let sizeMatches = previous.match(ALL_RESPONSIVE_SIZE_REGEX) || [];
	          let offsetMatches = previous.match(ALL_RESPONSIVE_OFFSET_REGEX) || [];
	          
	          next = next.replace(ALL_RESPONSIVE_SIZE_REGEX, '').replace(ALL_RESPONSIVE_OFFSET_REGEX, '');
	          next = [...sizeMatches, ...offsetMatches, next].join(' ');
	          
	          HTMLHelper.setAttribute(component, INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES[i], next);
	        } else if (INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES[i] == 'style') {
	        	if (!isForwardingStyleToChildren) {
		        	let previous = HTMLHelper.getHashMapFromInlineStyle(reservedAttributeValues[i]);
		        	let next = HTMLHelper.getHashMapFromInlineStyle(HTMLHelper.getAttribute(component, 'style'));
		        	
		        	for (let reservedStyleName of INHERITING_COMPONENT_RESERVED_STYLE_NAMES) {
		        		next[reservedStyleName] = previous[reservedStyleName];
		        	}
		        	
		        	HTMLHelper.setAttribute(component, INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES[i], HTMLHelper.getInlineStyleFromHashMap(next));
		        } else {
		        	HTMLHelper.setAttribute(component, INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES[i], reservedAttributeValues[i]);
		        }
	        } else {
	          HTMLHelper.setAttribute(component, INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES[i], reservedAttributeValues[i]);
	        }
	      } else {
	      	 HTMLHelper.removeAttribute(component, INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES[i]);
	      }
      }
      
      CapabilityHelper.installCapabilitiesForInternalElements(component);
      
      WorkspaceHelper.updateInheritingComponents(component);
      WorkspaceHelper.recursiveCleanupComponentPreviewDOM(component, true);
      
      if (isSelecting) EditorHelper.select(component);
    }
  },
  getComponentData: (id: string) => {
    let existingComponentInfo = InternalProjectSettings.components.filter(component => component.id == id)[0];
    if (!existingComponentInfo) return null;
    
    InternalComponents[id] = InternalComponents[id] || CodeHelper.clone(existingComponentInfo) || {};
    
    Object.assign(InternalComponents[id], existingComponentInfo);
    
    return InternalComponents[id];
  },
  getPopupData: (id: string) => {
    let existingPopupInfo = InternalProjectSettings.popups.filter(popup => popup.id == id)[0];
    if (!existingPopupInfo) return null;
    
    InternalPopups[id] = InternalPopups[id] || CodeHelper.clone(existingPopupInfo) || {};
    
    Object.assign(InternalPopups[id], existingPopupInfo);
    
    return InternalPopups[id];
  },
  getPopupKeyFromPath: (path: string): string => {
    for (let key in InternalPopups) {
    	if (InternalPopups.hasOwnProperty(key)) {
    		if (`${InternalPopups[key]['namespace']}.${InternalPopups[key]['klass']}` == path) {
    			return key;
    		}
    	}
    }
    
    return null;
  },
  getPageData: (id: String) => {
  	let existingPageInfo = InternalProjectSettings.pages.filter(page => page.id == id)[0];
    if (!existingPageInfo) return null;
    
    InternalSites[id] = InternalSites[id] || CodeHelper.clone(existingPageInfo) || {};
    
    Object.assign(InternalSites[id], existingPageInfo);
    
    InternalSites[id].head = InternalSites[id].head || {};
    InternalSites[id].head.fonts = InternalSites[id].head.fonts || {};
    InternalSites[id].body = InternalSites[id].body || DEFAULT_FLOW_PAGE_HTML;
    InternalSites[id].accessories = InternalSites[id].accessories || {};
    InternalSites[id].extensions = InternalSites[id].extensions || CodeHelper.clone(DEFAULT_PAGE_EXTENSIONS);
    
    return InternalSites[id];
  },
  getDataFlows: () => {
  	return InternalDataFlows.schema;
 	},
  generateFrontEndCodeForCurrentPage: (autoSwitch: boolean=false) => {
  	const previousMode = InternalProjectSettings.currentMode;
  	if (autoSwitch === true && ['data', 'services'].indexOf(previousMode) == -1) WorkspaceHelper.setMode('site');
  	
    let results = null;
    
  	if (InternalProjectSettings.currentMode == 'site') {
  		WorkspaceHelper.plugComponentInputs();
  		WorkspaceHelper.updateInPageComponents();
      WorkspaceHelper.updateInheritingComponents();
  		results = FrontEndDOMHelper.generateFrontEndCode();
  		WorkspaceHelper.unplugComponentInputs();
  		
  		const stylesheetAndExtension = AnimationHelper.renderStylesheetAndExtension(true, false);
  		
  		results.push([StylesheetHelper.renderStylesheet(true), stylesheetAndExtension[0]].join(' '));
  		results.push(stylesheetAndExtension[1]);
  	} else if (['components', 'popups'].indexOf(InternalProjectSettings.currentMode) != -1) {
  		WorkspaceHelper.plugComponentInputs();
  		WorkspaceHelper.updateInPageComponents();
      WorkspaceHelper.updateInheritingComponents();
  		results = FrontEndDOMHelper.generateFrontEndCode();
  		WorkspaceHelper.unplugComponentInputs();
  		results[0] = false;
  		results[1] = false;
  		results[3] = false;
  		results[4] = false;
  		
  		const stylesheetAndExtension = AnimationHelper.renderStylesheetAndExtension(true, false);
  		
  		results.push([StylesheetHelper.renderStylesheet(true), stylesheetAndExtension[0]].join(' '));
  		results.push(stylesheetAndExtension[1]);
  	}
  	
  	if (autoSwitch === true && ['data', 'services'].indexOf(previousMode) == -1) WorkspaceHelper.setMode(previousMode);
  	
  	return results;
  },
  generateBackEndCodeForCurrentPage: (autoSwitch: boolean=false) => {
  	const previousMode = InternalProjectSettings.currentMode;
  	if (autoSwitch === true) WorkspaceHelper.setMode('site');
  	
    let results;
  	if (InternalProjectSettings.currentMode == 'site') {
  		WorkspaceHelper.plugComponentInputs();
  		WorkspaceHelper.updateInPageComponents();
      WorkspaceHelper.updateInheritingComponents();
  		results = BackEndDOMHelper.generateBackEndCode();
  		WorkspaceHelper.unplugComponentInputs();
  	} else {
  		results = null;
  	}
  	
  	if (autoSwitch === true) WorkspaceHelper.setMode(previousMode);
  	
  	return results;
  },
  getCurrentGenerateFrontEndCodeKey: () => {
  	switch (InternalProjectSettings.currentMode) {
  		case 'site':
  			return InternalProjectSettings.editingPageID;
  		case 'components':
  			return '__' + InternalProjectSettings.editingComponentID;
  		case 'popups':
  			return '__' + InternalProjectSettings.editingPopupID;
  		default:
  			return '__' + RandomHelper.generateGUID();
  	}
  },
  generateFrontEndCodeForAllPages: (autoSwitch: boolean=false) => {
    const result = WorkspaceHelper.generateFrontEndCodeForCurrentPage(autoSwitch);
    if (result != null) cacheOfGeneratedFrontEndCodeForAllPages[WorkspaceHelper.getCurrentGenerateFrontEndCodeKey()] = result;
    
    for (let key in cacheOfGeneratedFrontEndCodeForAllPages) {
      if (cacheOfGeneratedFrontEndCodeForAllPages.hasOwnProperty(key)) {
        if (cacheOfGeneratedFrontEndCodeForAllPages[key] === null) {
          delete cacheOfGeneratedFrontEndCodeForAllPages[key];
        }
      }
    }
    
    return CodeHelper.sortHashtable(cacheOfGeneratedFrontEndCodeForAllPages);
  },
  generateBackEndCodeForAllPages: (autoSwitch: boolean=false) => {
  	const result = WorkspaceHelper.generateBackEndCodeForCurrentPage(autoSwitch);
    if (result != null) cacheOfGeneratedBackEndCodeForAllPages[InternalProjectSettings.editingPageID] = result;
    
    for (let key in cacheOfGeneratedBackEndCodeForAllPages) {
      if (cacheOfGeneratedBackEndCodeForAllPages.hasOwnProperty(key)) {
        if (cacheOfGeneratedBackEndCodeForAllPages[key] === null) {
          delete cacheOfGeneratedBackEndCodeForAllPages[key];
        }
      }
    }
    
    return cacheOfGeneratedBackEndCodeForAllPages;
 	},
 	clearFullStackCodeForAllPages: (data: any) => {
 		cacheOfGeneratedFrontEndCodeForAllPages = {};
 		cacheOfGeneratedBackEndCodeForAllPages = {};
    
    backEndControllerBlobSHADict = data.backEndControllerBlobSHADict || {};
    frontEndComponentsBlobSHADict = data.frontEndComponentsBlobSHADict || {};
    viewBlobSHADict = data.viewBlobSHADict || {};
    routeBlobSHA = data.routeBlobSHA || null;
    controllerBlobSHA = data.controllerBlobSHA || null;
    siteBundleBlobSHA = data.siteBundleBlobSHA || null;
 	},
  getCommonExpandingFeatureScripts: () => {
  	let container = document.createElement('div');
  	
  	for (let key in InternalComponents) {
  		if (InternalComponents.hasOwnProperty(key)) {
  			let element = document.createElement('div');
  			element.innerHTML = (InternalComponents[key].html || DEFAULT_COMPONENT_HTML).join('\n');
  			
  			container.appendChild(element);
  		}
  	}
  	for (let key in InternalPopups) {
  		if (InternalPopups.hasOwnProperty(key)) {
  			let element = document.createElement('div');
  			element.innerHTML = (InternalPopups[key].html || DEFAULT_POPUP_HTML).join('\n');
  			
  			container.appendChild(element);
  		}
  	}
  	
  	WorkspaceHelper.plugComponentInputs(container);
  	WorkspaceHelper.updateInPageComponents();
    WorkspaceHelper.updateInheritingComponents();
  	let combinedHTMLTags, combinedMinimalFeatureScripts, combinedExpandingFeatureScripts, combinedFontTags, combinedInlineBodyStyle, combinedStylesheet;
  	[combinedHTMLTags, combinedMinimalFeatureScripts, combinedExpandingFeatureScripts, combinedFontTags, combinedInlineBodyStyle, combinedStylesheet] = FrontEndDOMHelper.generateFrontEndCode(container);
  	WorkspaceHelper.unplugComponentInputs(container);
  	
  	return combinedExpandingFeatureScripts || '';
  },
  plugComponentInputs: (root: HTMLElement=HTMLHelper.getElementByAttributeNameAndValue("internal-fsb-guid", "0")) => {
  	let popups = [...HTMLHelper.getElementsByAttribute('internal-fsb-popup-init-class', root)];
  	popups.forEach(popup => {
  		const popupClass = HTMLHelper.getAttribute(popup, 'internal-fsb-popup-init-class');
  		const key = WorkspaceHelper.getPopupKeyFromPath(popupClass);
	  	const popupInfo = key && WorkspaceHelper.getPopupData(key);
  		
  		if (popupInfo) {
	  		let element = document.createElement('div');
	      element.innerHTML = WorkspaceHelper.cleanupComponentHTMLData(popupInfo.html.join('\n'));
	      element = element.firstElementChild;
	      
	      HTMLHelper.addClass(element, 'internal-fsb-plug');
	      
	      root.appendChild(element);
	    }
  	});
  },
  unplugComponentInputs: (root: HTMLElement=HTMLHelper.getElementByAttributeNameAndValue("internal-fsb-guid", "0")) => {
  	let plugs = [...HTMLHelper.getElementsByClassName('internal-fsb-plug', root)];
    plugs.forEach(plug => plug.parentNode.removeChild(plug));
  }
}

export {InternalProjectSettings, WorkspaceHelper}; 