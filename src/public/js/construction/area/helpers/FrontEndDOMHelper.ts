import {HTMLHelper} from '../../helpers/HTMLHelper.js';
import {CodeHelper} from '../../helpers/CodeHelper.js';
import {StylesheetHelper} from './StylesheetHelper.js';
import {Accessories, EditorHelper} from './EditorHelper.js';
import {WorkspaceHelper} from './WorkspaceHelper.js';
import {SchemaHelper} from './SchemaHelper.js';
import {FrontEndReactHelper, DEFAULTS} from '../../helpers/FrontEndReactHelper.js';
import {CAMEL_OF_EVENTS_DICTIONARY, REQUIRE_FULL_CLOSING_TAGS, CONTAIN_TEXT_CONTENT_TAGS, INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES, INHERITING_COMPONENT_RESERVED_STYLE_NAMES, INHERITING_COMPONENT_RESERVED_STYLE_NAMES_IN_CAMEL, ALL_RESPONSIVE_SIZE_REGEX, ALL_RESPONSIVE_OFFSET_REGEX, FORM_CONTROL_CLASS_LIST, DOT_NOTATION_CONSUMABLE_TAG_LIST, DOT_NOTATION_CONSUMABLE_CLASS_LIST, NONE_NATIVE_SUPPORT_OF_CAMEL_OF_EVENTS} from '../../Constants.js';

let cachedGenerateCodeForReactRenderMethodElement = null;
let cachedGenerateCodeForReactRenderMethodResults = null;

// This code generator relies on elements in construction area.
// 
var FrontEndDOMHelper = {
	invalidate: function() {
		cachedGenerateCodeForReactRenderMethodElement = null;
		cachedGenerateCodeForReactRenderMethodResults = null;
	},
	generateFrontEndCode: function(root: HTMLElement=HTMLHelper.getElementByAttributeNameAndValue("internal-fsb-guid", "0")) {
    // Document Level
    // 
    let generatedRenderMethodRootResult = FrontEndDOMHelper.generateCodeForReactRenderMethod(root);
    let generatedMergingSectionRootResult = FrontEndDOMHelper.generateCodeForMergingSection(root);
    
    let functionDeclarations = generatedMergingSectionRootResult[1];
    let functionBindings = generatedMergingSectionRootResult[0];
    let rootHTML = generatedRenderMethodRootResult[1];
    let rootScript = generatedRenderMethodRootResult[0];
    
		// Generate Scripts
		// SEO: Optimize Score of Google PageSpeed Insights.
		// 
		let executions: string[] = [];
    let lines: string[] = [];
    
    FrontEndDOMHelper.recursiveGenerateCodeForPage(root, '      ', executions, lines);
    
    let allReactComponentsScript = lines.join('\n');
    let allReactPrerequisiteScript = executions.join('\n');
    
  	let combinedHTMLTags = `${rootHTML}`;
		let combinedMinimalFeatureScripts = 
`class Controller {
  dictionary: {} = {};
  
  ${functionDeclarations}
  
  public register(guid, eventName, functionName) {
    if (!this.dictionary[guid]) this.dictionary[guid] = {};
    this.dictionary[guid][eventName] = functionName;
  }
  public listen(guid) {
    if (this.dictionary[guid]) {
      for (let key in this.dictionary[guid]) {
        if (this.dictionary[guid].hasOwnProperty(key)) {
          const eventName = key;
          const functionName = this.dictionary[guid][key];
          const element = this.getElementUsingGUID(guid);
          
          element.addEventListener(eventName, this[functionName].bind(this), false);
        }
      }
    }
  }
  public getElementUsingGUID(guid) {
    return document.querySelectorAll('[internal-fsb-guid="' + guid + '"]')[0];
  }
}
let controller = new Controller();
${functionBindings}
${rootScript}`;
		let combinedExpandingFeatureScripts = `${allReactPrerequisiteScript}${allReactComponentsScript}`;
		
		let links = HTMLHelper.getElementsByAttribute('internal-fsb-link');
		links = links.map(link => link.outerHTML);
		let combinedFontTags = links;
		
		let combinedInlineBodyStyle = HTMLHelper.getAttribute(document.body, 'style');
    
    return [combinedHTMLTags, combinedMinimalFeatureScripts, combinedExpandingFeatureScripts, combinedFontTags, combinedInlineBodyStyle];
	},
	recursiveGenerateCodeForPage: function(element: HTMLElement, indent: string, executions: string[], lines: string[], isFirstElement: boolean=true) {
		if (HTMLHelper.hasClass(element, 'internal-fsb-accessory')) return;
    
    if (element && element.tagName) {
    	if (!isFirstElement && HTMLHelper.getAttribute(element, 'internal-fsb-react-mode')) {
    		let _info = HTMLHelper.getAttributes(element, false);
    		
        _info.autoGeneratedCodeForRenderMethod = FrontEndDOMHelper.generateCodeForReactRenderMethod(element);
        _info.autoGeneratedCodeForMergingRenderMethod = FrontEndDOMHelper.generateCodeForMergingSection(element);
    		
    		let _code, _mapping;
    		[_code, _mapping] = FrontEndReactHelper.generateReactCode(_info);
    		
    		lines.push(_code);
    	}
    	
    	let children = [...element.childNodes];
    	
    	children = children.filter(element => [Accessories.cursor.getDOMNode(), Accessories.resizer.getDOMNode(), Accessories.guide.getDOMNode()].indexOf(element) == -1);
    	
	    for (let child of children) {
	      FrontEndDOMHelper.recursiveGenerateCodeForPage(child, indent, executions, lines, false);
	    }
    }
	},
  generateCodeForReactRenderMethod: function(element: HTMLElement) {
  	if (cachedGenerateCodeForReactRenderMethodElement == element && cachedGenerateCodeForReactRenderMethodResults)
  		return cachedGenerateCodeForReactRenderMethodResults;
  	
    let executions: string[] = [];
    let lines: string[] = [];
    
    if (EditorHelper.hasParentReactComponent(element)) {
    	FrontEndDOMHelper.recursiveGenerateCodeForReactRenderMethod(element, '      ', executions, lines);
    } else {
    	FrontEndDOMHelper.recursiveGenerateCodeForFallbackRendering(element, '      ', executions, lines);
    }
    
    cachedGenerateCodeForReactRenderMethodElement = element;
    cachedGenerateCodeForReactRenderMethodResults = ['\n' + executions.join('\n'), '\n' + lines.join('\n')];
    
    return cachedGenerateCodeForReactRenderMethodResults;
  },
  recursiveGenerateCodeForReactRenderMethod: function(element: HTMLElement, indent: string, executions: string[], lines: string[], isFirstElement: boolean=true, cumulatedDotNotation: string="", dotNotationChar: string='i') {
    if (HTMLHelper.hasClass(element, 'internal-fsb-accessory')) return;
    
    if (element) {
      if (!element.tagName) {
        lines.push(indent + element.textContent);
      } else {
        let tag = element.tagName.toLowerCase();
        let _attributes = HTMLHelper.getAttributes(element, true, {}, false);
        let classes = '';
        let styles = null;
        let bindingStyles = {};
        let attributes = [];
        let isForChildren = false;
        let isReactElement = false;
        let reactMode = null;
        let reactCommand = null;
        let reactNamespace = null;
        let reactClass = null;
        let reactID = null;
        let reactData = null;
        let reactClassComposingInfoClassName = null;
        let reactClassComposingInfoGUID = null;
        let reactClassForPopup = null;
        let inheritingID = null;
        let inheritingAttributes = [];
        let inheritingStyles = [];
        let submitControls = null;
        let submitType = null;
        let customEvents = [];
        
        let consumableTagItem = DOT_NOTATION_CONSUMABLE_TAG_LIST.filter(item => (item[0] == tag))[0];
        let consumableClassItem = DOT_NOTATION_CONSUMABLE_CLASS_LIST.filter(item => (item[0] == HTMLHelper.getAttribute(element, 'internal-fsb-class')))[0];
        let dotNotation = HTMLHelper.getAttribute(HTMLHelper.hasClass(element, 'internal-fsb-element') ?
        		element : element.parentNode, 'internal-fsb-react-data');
        let dangerouslySetInnerHTML = false
        
        if (dotNotation) {
	        if (consumableTagItem) {
	          dangerouslySetInnerHTML = consumableTagItem[1] == 'dangerouslySetInnerHTML';
	          
	          if (tag == 'input') {
		          if (['hidden'].indexOf(HTMLHelper.getAttribute(element, 'type')) != -1) {
		          	consumableTagItem = CodeHelper.clone(consumableTagItem);
		          	consumableTagItem[1] = 'value';
		          } else if (['radio'].indexOf(HTMLHelper.getAttribute(element, 'type')) != -1) {
		          	consumableTagItem = CodeHelper.clone(consumableTagItem);
		          	consumableTagItem[1] = 'defaultChecked';
		          	consumableTagItem[2] = '{';
		          	consumableTagItem[3] = ' == \'' + HTMLHelper.getAttribute(element, 'value') + '\'}';
		          } else if (['checkbox'].indexOf(HTMLHelper.getAttribute(element, 'type')) != -1) {
		          	consumableTagItem = CodeHelper.clone(consumableTagItem);
		          	consumableTagItem[1] = 'defaultChecked';
		          	consumableTagItem[2] = '{';
		          	consumableTagItem[3] = ' === true}';
		          }
		        }
	          
	        	let index = _attributes.findIndex(attribute => (attribute.name == consumableTagItem[1]));
	        	if (index != -1) {
	        		_attributes[index].value = consumableTagItem[2] + `___DATA___` + consumableTagItem[3];
	        	} else {
	        		_attributes.push({
	        			name: consumableTagItem[1],
	        			value: consumableTagItem[2] + `___DATA___` + consumableTagItem[3]
	        		});
	        	}
	        }
	        
	        if (consumableClassItem) {
	          dangerouslySetInnerHTML = consumableClassItem[1] == 'dangerouslySetInnerHTML';
	          
	        	let index = _attributes.findIndex(attribute => (attribute.name == consumableClassItem[1]));
	        	if (index != -1) {
	        		_attributes[index].value = consumableClassItem[2] + `___DATA___` + consumableClassItem[3];
	        	} else {
	        		_attributes.push({
	        			name: consumableClassItem[1],
	        			value: consumableClassItem[2] + `___DATA___` + consumableClassItem[3]
	        		});
	        	}
	        }
	      }
	      
	      let innerHTML = HTMLHelper.getAttribute(element, 'internal-fsb-inner-html') || '';
        if (innerHTML.trim() != '') {
          dangerouslySetInnerHTML = true; 
          
        	let index = _attributes.findIndex(attribute => (attribute.name == 'dangerouslySetInnerHTML'));
        	if (index != -1) {
        		_attributes[index].value = `{{__html: ${JSON.stringify(innerHTML)}}}`;
        	} else {
        		_attributes.push({
        			name: 'dangerouslySetInnerHTML',
        			value: `{{__html: ${JSON.stringify(innerHTML)}}}`
        		});
        	}
        }
        
        for (let attribute of _attributes) {
          if (attribute.name.indexOf('internal-fsb-react-style-') == 0 && attribute.value) {
            let bindingName = attribute.name.replace('internal-fsb-react-style-', '');
            let bindingType = attribute.value.split('[')[0];
            let bindingValue = attribute.value.match(/^[A-Z]+\[(.+)\]$/)[1];
            
            switch (bindingType) {
              case 'SETTING':
                bindingStyles[bindingName] = 'Project.Settings.' + bindingValue;
                break;
              case 'PROPERTY':
                bindingStyles[bindingName] = 'this.props.' + bindingValue;
                break;
              case 'STATE':
                bindingStyles[bindingName] = 'this.state.' + bindingValue;
                break;
              case 'CODE':
                bindingStyles[bindingName] = '(()=>{' + bindingValue + '})()';
                break;
            }
          }
        }
        
        for (let attribute of _attributes) {
          switch (attribute.name) {
            case 'class':
              classes = attribute.value.trim().replace(/[\ ]+/g, ' ');
              
		          let sizeMatches = attribute.value.match(ALL_RESPONSIVE_SIZE_REGEX) || [];
		          let offsetMatches = attribute.value.match(ALL_RESPONSIVE_OFFSET_REGEX) || [];
		          
              inheritingAttributes.push("'classes': '" + [...sizeMatches, ...offsetMatches].join(' ') + "'");
              break;
            case 'style':
              let hashMap = HTMLHelper.getHashMapFromInlineStyle(attribute.value);
              for (let key in hashMap) {
                if (hashMap.hasOwnProperty(key)) {
                  if (styles == null) styles = [];
                  let camelKey = key.replace(/\-([a-z])/g, (matched) => { return matched[1].toUpperCase(); });
                  if (!camelKey) continue;
                  if (camelKey.indexOf('FsbCell') == 0) continue;
                  if (camelKey.indexOf('FsbForChildren') == 0 && hashMap[key] == 'true') {
                    isForChildren = true;
                    continue;
                  }
                  
                  if (bindingStyles[key]) {
                  	let token = "'" + camelKey + "': " + bindingStyles[key] + " || '" + hashMap[key] + "'";
                    styles.push(token);
                    delete bindingStyles[key];
                  
	                  if (INHERITING_COMPONENT_RESERVED_STYLE_NAMES.indexOf(key) != -1) {
		                	inheritingStyles.push(token);
		                }
                  } else {
                  	let token = "'" + camelKey + "': '" + hashMap[key] + "'";
                    styles.push(token);
                  
	                  if (INHERITING_COMPONENT_RESERVED_STYLE_NAMES.indexOf(key) != -1) {
		                	inheritingStyles.push(token);
		                }
                  }
                }
              }
              break;
            case 'internal-fsb-react-mode':
              if (!!attribute.value) reactMode = attribute.value;
              break;
            case 'internal-fsb-react-command':
              if (!!attribute.value) reactCommand = attribute.value;
              break;
            case 'internal-fsb-react-namespace':
              if (!!attribute.value) reactNamespace = attribute.value;
              break;
            case 'internal-fsb-react-class':
              if (!!attribute.value) reactClass = attribute.value;
              break;
            case 'internal-fsb-react-id':
              if (!!attribute.value) reactID = attribute.value;
              break;
            case 'internal-fsb-react-data':
              if (!!attribute.value) reactData = attribute.value;
              break;
            case 'internal-fsb-data-controls':
              if (!!attribute.value) submitControls = attribute.value.trim();
              break;
            case 'internal-fsb-data-wizard-type':
            	if (!!attribute.value) submitType = attribute.value;
              break;
            case 'internal-fsb-class':
              if (!!attribute.value) reactClassComposingInfoClassName = attribute.value;
              break;
            case 'internal-fsb-guid':
              if (!!attribute.value) reactClassComposingInfoGUID = attribute.value;
              break;
            case 'internal-fsb-popup-init-class':
              if (!!attribute.value) reactClassForPopup = attribute.value;
              break;
            case 'internal-fsb-inheriting':
              if (!!attribute.value) inheritingID = attribute.value;
              break;
            case 'contenteditable':
              continue;
            default:
              if (attribute.name.indexOf('internal-fsb-') == 0) continue;
              if (CAMEL_OF_EVENTS_DICTIONARY[attribute.name]) {
              	let value = null;
              	if (attribute.value) value = JSON.parse(attribute.value);
            		else value = {};
            		
            		if (value.event) {
	                let FUNCTION_NAME = CAMEL_OF_EVENTS_DICTIONARY[attribute.name].replace(/^on/, 'on' + HTMLHelper.getAttribute(element, 'internal-fsb-class')) + '_' + HTMLHelper.getAttribute(element, 'internal-fsb-guid');
	                
            			if (NONE_NATIVE_SUPPORT_OF_CAMEL_OF_EVENTS.indexOf(attribute.name) == -1) {
		                attributes.push(CAMEL_OF_EVENTS_DICTIONARY[attribute.name] + '={this.' + FUNCTION_NAME + '.bind(this)}');
		              } else {
		              	customEvents.push([CAMEL_OF_EVENTS_DICTIONARY[attribute.name].replace(/^on/, '').toLowerCase(), 'this.' + FUNCTION_NAME + '.bind(this)']);
		              }
	              }
              } else {
              	if (['required', 'disabled', 'readonly'].indexOf(attribute.name) == -1) {
              		attributes.push(attribute.name + '=' + ((attribute.value[0] == '{') ? attribute.value : '"' + attribute.value.split('"').join('&quot;') + '"'));
              	} else {
              		attributes.push(attribute.name + '=' + ((attribute.value[0] == '{') ? attribute.value : '{' + attribute.value + '}'));
              	}
                
                if (INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES.indexOf(attribute.name) != -1) {
                	inheritingAttributes.push("'" + attribute.name + "': " + ((attribute.value[0] == '{') ? attribute.value : "'" + attribute.value.split('"').join('&quot;') + "'"));
                }
              }
              break;
          }
        }
        
        if (submitControls) {
          executions.push(`    DataManipulationHelper.register(${JSON.stringify(reactClassComposingInfoGUID)}, ${JSON.stringify(submitType)}, ${JSON.stringify(submitControls && submitControls.split(' ') || [])}, {initClass: ${JSON.stringify(reactClassForPopup)}});`);
          
          let notation = cumulatedDotNotation.split('[')[0];
          if (!notation) {
          	for (let submitControl of submitControls.split(' ')) {
          		let control = HTMLHelper.getElementByAttributeNameAndValue('internal-fsb-guid', submitControl);
          		if (control) {
          			let dataSourceName = HTMLHelper.getAttribute(control, 'internal-fsb-data-source-name');
          			if (dataSourceName) {
          				notation = dataSourceName;
          				break;
          			}
          		}
          	}
          }
          
        	attributes.push(`onClick={((event) => { window.internalFsbSubmit('${reactClassComposingInfoGUID}', '${notation}', event, ((results: any) => { this.manipulate('${reactClassComposingInfoGUID}', '${notation}', results); }).bind(this)); }).bind(this)}`);
        }
        
        if (reactClassComposingInfoGUID) {
        	for (let customEvent of customEvents) {
        		executions.push(`    if (HTMLHelper.getElementByAttributeNameAndValue('internal-fsb-guid', '${reactClassComposingInfoGUID}')) {
      HTMLHelper.getElementByAttributeNameAndValue('internal-fsb-guid', '${reactClassComposingInfoGUID}').addEventListener('${customEvent[0]}', ${customEvent[1]});
    }`);
        	}
        }
        
        for (let key in bindingStyles) {
          if (bindingStyles.hasOwnProperty(key)) {
            if (styles == null) styles = [];
            let camelKey = key.replace(/\-([a-z])/g, (matched) => { return matched[1].toUpperCase(); });
            styles.push(camelKey + ': ' + bindingStyles[key]);
          }
        }
        
        if (isForChildren && classes.indexOf('internal-fsb-element') != -1) {
          classes = CodeHelper.getInternalClasses(classes);
        } else if (isForChildren) {
          reactID = HTMLHelper.getAttribute(element.parentNode, 'internal-fsb-react-id');
        }
        
        if (!reactNamespace) {
          reactNamespace = 'Project.Controls';
        }
        
        if (!reactClass && reactClassComposingInfoClassName && reactClassComposingInfoGUID) {
          reactClass = reactClassComposingInfoClassName + '_' + reactClassComposingInfoGUID;
        }
        
        if (reactMode == 'Site' && isFirstElement) {
        	if (classes) classes = classes.replace(ALL_RESPONSIVE_SIZE_REGEX, '').replace(ALL_RESPONSIVE_OFFSET_REGEX, '').trim().replace(/[\ ]+/g, ' ');
        	if (styles) styles = styles.filter(style => INHERITING_COMPONENT_RESERVED_STYLE_NAMES_IN_CAMEL.indexOf(style.split("':")[0].split("'")[1]) == -1);
        }
        
        if (!inheritingID && WorkspaceHelper.getComponentData(reactClassComposingInfoGUID)) {
        	inheritingID = reactClassComposingInfoGUID;
        }
        
        if (inheritingID) {
          let componentInfo = WorkspaceHelper.getComponentData(inheritingID);
          if (componentInfo) {
          	reactMode = 'Inheriting';
            reactNamespace = componentInfo.namespace;
            reactClass = componentInfo.klass;
            
            inheritingAttributes.push("'styles': {" + inheritingStyles.join(', ') + "}");
          } else {
          	inheritingID = null;
          }
        }
	      
        if (isFirstElement) {
          reactData = null;
        }
        
        // For react rendering method:
        // 
        if (reactID && (!isForChildren || classes.indexOf('internal-fsb-element') == -1)) {
          attributes.splice(0, 0, 'ref="' + reactID + '"');
        }
        
        // Dot Notation Feature
        // 
        let _indent = indent;
        let _leafNode = FrontEndDOMHelper.isNotationLeafNode(cumulatedDotNotation + reactData);
        let _nodeData = 'data';
        if (reactData !== null) {
        	if (!_leafNode) {
	      		lines.push(indent + '{this.getDataFromNotation("' + cumulatedDotNotation + reactData + '", true).map((data, ' + dotNotationChar + ') => {');
	          lines.push(_indent + '  return (');
	          
	          indent += '    ';
	          
	          cumulatedDotNotation += reactData + '[" + ' + dotNotationChar + ' + "].';
	        } else {
	        	_nodeData = 'this.getDataFromNotation("' + cumulatedDotNotation + reactData + '")';
	        	
	        	cumulatedDotNotation += reactData + '.';
	        }
        }
        
        // Include Another React Class Feature
        // 
        if (reactMode && !isFirstElement) {
          let composed = indent;
          
          composed += '<' + reactNamespace + '.' + reactClass + ' ' + (reactData ? 'key={"item_" + ' + dotNotationChar + '} ' : '') + (reactID && !reactData ? 'ref="' + reactID + '" ' : '') + (reactID && reactData ? 'ref={"' + reactID + '[" + ' + dotNotationChar + ' + "]" ' : '') + (reactData ? 'data={' + _nodeData + '} ' : '') + (inheritingID ? `forward={{${inheritingAttributes.join(', ')}}} ` : '') + '/>';
          
          lines.push(composed);
        }
        
        // Dot Notation Feature (Continue 1/2)
        // 
        if (reactData && !_leafNode) {
          attributes.splice(0, 0, 'key={"item_" + ' + dotNotationChar + '}');
        }
        
        if (reactData !== null || (reactMode && !isFirstElement)) {
        	if (!_leafNode) {
	          let charcode = dotNotationChar.charCodeAt() + 1;
	          dotNotationChar = String.fromCharCode(charcode);
	        }
        }
        
        // Recursive Children Feature
        //
        if (!reactMode || isFirstElement) {
          let composed = indent;
          let children = [...element.childNodes];
          
          children = children.filter(element => [Accessories.cursor.getDOMNode(), Accessories.resizer.getDOMNode(), Accessories.guide.getDOMNode()].indexOf(element) == -1 && (!!element.tagName || element.textContent.trim() != ''));
          
          composed += '<' + tag;
          if (classes != '') {
          	if (!isFirstElement) composed += ' className="' + classes + '"';
          	else composed += ' className={"' + classes + ' " + (this.props.forward && this.props.forward.classes || \'\')}';
          }
          if (reactClassComposingInfoGUID != null) composed += ' internal-fsb-guid="' + reactClassComposingInfoGUID + '"';
          if (styles != null) {
            if (!isFirstElement) attributes.splice(0, 0, 'style={{' + styles.join(', ') + '}}');
            else attributes.splice(0, 0, 'style={Object.assign({' + styles.join(', ') + '}, this.props.forward && this.props.forward.styles || {})}');
          } else if (isFirstElement) {
            attributes.splice(0, 0, 'style={Object.assign({}, this.props.forward && this.props.forward.styles || {})}');
          }
          if (attributes.length != 0) composed += ' ' + attributes.join(' ').replace(/___DATA___/g, _nodeData);
          
          if (!dangerouslySetInnerHTML) {
            composed += (children.length == 0 && REQUIRE_FULL_CLOSING_TAGS.indexOf(tag) == -1) ? ' />' : '>';
            
            lines.push(composed);
            
            for (let child of children) {
              FrontEndDOMHelper.recursiveGenerateCodeForReactRenderMethod(child, indent + '  ', executions, lines, false, cumulatedDotNotation, dotNotationChar);
            }
            
            if (children.length != 0 || REQUIRE_FULL_CLOSING_TAGS.indexOf(tag) != -1) {
  	          if (CONTAIN_TEXT_CONTENT_TAGS.indexOf(tag) == -1) {
  	            composed = indent;
  	          } else {
  	            composed = indent;
  	          }
  	          composed += '</' + tag + '>';
  	          lines.push(composed);
  	        }
  	      } else {
  	        composed += '>';
  	        composed += '</' + tag + '>';
  	        
  	        lines.push(composed);
  	      }
        }
        
        // Dot Notation Feature (Continue 2/2)
        // 
        if (reactData !== null && !_leafNode) {
        	lines.push(_indent + '  )');
        	lines.push(_indent + '})}');
        }
      }
	  }
	},
	recursiveGenerateCodeForFallbackRendering: function(element: HTMLElement, indent: string, executions: string[], lines: string[], isFirstElement: boolean=true) {
    if (HTMLHelper.hasClass(element, 'internal-fsb-accessory')) return;
    
    if (element) {
      if (!element.tagName) {
        lines.push(indent + element.textContent);
      } else {
        let tag = element.tagName.toLowerCase();
        let _attributes = HTMLHelper.getAttributes(element, true, {}, false);
        let classes = '';
        let styles = null;
        let bindingStyles = {};
        let events = [];
        let attributes = [];
        let isForChildren = false;
        let isReactElement = false;
        let reactMode = null;
        let reactCommand = null;
        let reactNamespace = null;
        let reactClass = null;
        let reactClassComposingInfoClassName = null;
        let reactClassComposingInfoGUID = null;
        let reactClassForPopup = null;
        let inheritingID = null;
        let inheritingAttributes = [];
        let inheritingStyles = [];
        let submitControls = null;
        let submitType = null;
        
        for (let attribute of _attributes) {
          if (attribute.name.indexOf('internal-fsb-react-style-') == 0 && attribute.value) {
            let bindingName = attribute.name.replace('internal-fsb-react-style-', '');
            let bindingType = attribute.value.split('[')[0];
            let bindingValue = attribute.value.match(/^[A-Z]+\[(.+)\]$/)[1];
            
            switch (bindingType) {
              case 'SETTING':
                bindingStyles[bindingName] = 'Project.Settings.' + bindingValue;
                break;
              case 'PROPERTY':
                bindingStyles[bindingName] = 'this.props.' + bindingValue;
                break;
              case 'STATE':
                bindingStyles[bindingName] = 'this.state.' + bindingValue;
                break;
              case 'CODE':
                bindingStyles[bindingName] = '(()=>{' + bindingValue + '})()';
                break;
            }
          }
        }
        
        for (let attribute of _attributes) {
          switch (attribute.name) {
            case 'class':
              classes = attribute.value.replace(/(internal-fsb-allow-cursor)/g, '').trim();
              
              let sizeMatches = attribute.value.match(ALL_RESPONSIVE_SIZE_REGEX) || [];
		          let offsetMatches = attribute.value.match(ALL_RESPONSIVE_OFFSET_REGEX) || [];
		          
              inheritingAttributes.push("'classes': '" + [...sizeMatches, ...offsetMatches].join(' ') + "'");
              break;
            case 'style':
              let hashMap = HTMLHelper.getHashMapFromInlineStyle(attribute.value);
              for (let key in hashMap) {
                if (hashMap.hasOwnProperty(key)) {
                  if (styles == null) styles = [];
                  if (key.indexOf('-fsb-cell') == 0) continue;
                  if (key.indexOf('-fsb-for-children') == 0 && hashMap[key] == 'true') {
                    isForChildren = true;
                    continue;
                  }
                  styles.push(key + ': ' + hashMap[key]);
                  
                  if (INHERITING_COMPONENT_RESERVED_STYLE_NAMES.indexOf(key) != -1) {
                  	let camelKey = key.replace(/\-([a-z])/g, (matched) => { return matched[1].toUpperCase(); });
	                	inheritingStyles.push("'" + camelKey + "': '" + hashMap[key] + "'");
	                }
                }
              }
              break;
            case 'internal-fsb-react-mode':
              if (!!attribute.value) reactMode = attribute.value;
              break;
            case 'internal-fsb-react-command':
              if (!!attribute.value) reactCommand = attribute.value;
              break;
            case 'internal-fsb-react-namespace':
              if (!!attribute.value) reactNamespace = attribute.value;
              break;
            case 'internal-fsb-react-class':
              if (!!attribute.value) reactClass = attribute.value;
              break;
            case 'internal-fsb-data-controls':
              if (!!attribute.value) submitControls = attribute.value.trim();
              break;
            case 'internal-fsb-data-wizard-type':
            	if (!!attribute.value) submitType = attribute.value;
              break;
            case 'internal-fsb-class':
              if (!!attribute.value) reactClassComposingInfoClassName = attribute.value;
              break;
            case 'internal-fsb-guid':
              if (!!attribute.value) reactClassComposingInfoGUID = attribute.value;
              break;
            case 'internal-fsb-popup-init-class':
              if (!!attribute.value) reactClassForPopup = attribute.value;
              break;
            case 'internal-fsb-inheriting':
              if (!!attribute.value) inheritingID = attribute.value;
              break;
            case 'contenteditable':
              continue;
            default:
              if (attribute.name.indexOf('internal-fsb-') == 0) continue;
              if (CAMEL_OF_EVENTS_DICTIONARY[attribute.name]) {
              	let value = null;
              	if (attribute.value) value = JSON.parse(attribute.value);
            		else value = {};
            		
            		if (value.event) {
	                let FUNCTION_NAME = CAMEL_OF_EVENTS_DICTIONARY[attribute.name].replace(/^on/, 'on' + HTMLHelper.getAttribute(element, 'internal-fsb-class')) + '_' + HTMLHelper.getAttribute(element, 'internal-fsb-guid');
	                
            			if (NONE_NATIVE_SUPPORT_OF_CAMEL_OF_EVENTS.indexOf(attribute.name) == -1) {
		                events.push([CAMEL_OF_EVENTS_DICTIONARY[attribute.name].replace(/^on/, '').toLowerCase(), FUNCTION_NAME]);
		              }
	              }
              } else {
                attributes.push(attribute.name + '=' + ((attribute.value[0] == '{') ? attribute.value : '"' + attribute.value.split('"').join('&quot;') + '"'));
                
                if (INHERITING_COMPONENT_RESERVED_ATTRIBUTE_NAMES.indexOf(attribute.name) != -1) {
                	inheritingAttributes.push("'" + attribute.name + "': " + ((attribute.value[0] == '{') ? attribute.value : "'" + attribute.value.split('"').join('&quot;') + "'"));
                }
              }
              break;
          }
        }
        
        if (submitControls) {
          executions.push(`DataManipulationHelper.register(${JSON.stringify(reactClassComposingInfoGUID)}, ${JSON.stringify(submitType)}, ${JSON.stringify(submitControls && submitControls.split(' ') || [])}, {initClass: ${JSON.stringify(reactClassForPopup)}});`);
          
        	attributes.push(`onClick="internalFsbSubmit('${reactClassComposingInfoGUID}', null, event, null)"`);
        }
        
        if (isForChildren && classes.indexOf('internal-fsb-element') != -1) {
          styles = null;
          classes = CodeHelper.getInternalClasses(classes);
        }
        
        if (!reactNamespace) {
          reactNamespace = 'Project.Controls';
        }
        
        if (!reactClass && reactClassComposingInfoClassName && reactClassComposingInfoGUID) {
          reactClass = reactClassComposingInfoClassName + '_' + reactClassComposingInfoGUID;
        }
        
        if (reactMode == 'Site' && isFirstElement) {
        	if (classes) classes = classes.replace(ALL_RESPONSIVE_SIZE_REGEX, '').replace(ALL_RESPONSIVE_OFFSET_REGEX, '').trim().replace(/[\ ]+/g, ' ');
        	if (styles) styles = styles.filter(style => INHERITING_COMPONENT_RESERVED_STYLE_NAMES_IN_CAMEL.indexOf(style.split("':")[0].split("'")[1]) == -1);
        }
        
        if (!inheritingID && WorkspaceHelper.getComponentData(reactClassComposingInfoGUID)) {
        	inheritingID = reactClassComposingInfoGUID;
        }
        
        if (inheritingID) {
          let componentInfo = WorkspaceHelper.getComponentData(inheritingID);
          if (componentInfo) {
            reactMode = 'Inheriting';
            reactNamespace = componentInfo.namespace;
            reactClass = componentInfo.klass;
            
            inheritingAttributes.push("'styles': {" + inheritingStyles.join(', ') + "}");
          } else {
          	inheritingID = null;
          }
        }
        
	      // For HTML5 fallback rendering:
	      // TODO: still skip dot notation in fallback mode.
        // 
        
      	// Include Another React Class Feature
        // 
      	if (reactMode && !isFirstElement) {
      		lines.push(indent + '<span internal-fsb-init-class="' + reactNamespace + '.' + reactClass + '"' + (inheritingID ?' internal-fsb-init-forward="{' + inheritingAttributes.join(', ') + '}"' : '') + '></span>');
      	}
      	
      	// Recursive Children Feature
        //
      	if (!reactMode || isFirstElement) {
      		let composed = indent;
          let children = [...element.childNodes];
          
          children = children.filter(element => [Accessories.cursor.getDOMNode(), Accessories.resizer.getDOMNode(), Accessories.guide.getDOMNode()].indexOf(element) == -1);
          
          composed += '<' + tag;
          if (reactClassComposingInfoGUID != null) composed += ' internal-fsb-guid="' + reactClassComposingInfoGUID + '"';
          if (classes != '') composed += ' class="' + classes + '"';
          if (styles != null) composed += ' style="' + styles.join('; ') + ';"';
          if (attributes.length != 0) composed += ' ' + attributes.join(' ');
          composed += (children.length == 0 && REQUIRE_FULL_CLOSING_TAGS.indexOf(tag) == -1) ? ' />' : '>';
          
          lines.push(composed);
          
          for (let eventInfo of events) {
          	executions.push(`controller.listen('${reactClassComposingInfoGUID}');`);
          }
          
          for (let child of children) {
            FrontEndDOMHelper.recursiveGenerateCodeForFallbackRendering(child, indent + '  ', executions, lines, false);
          }
          
          if (children.length != 0 || REQUIRE_FULL_CLOSING_TAGS.indexOf(tag) != -1) {
	          if (CONTAIN_TEXT_CONTENT_TAGS.indexOf(tag) == -1) {
	            composed = indent;
	          } else {
	            composed = indent;
	          }
	          composed += '</' + tag + '>';
	          lines.push(composed);
	        }
      	}
      }
    }
  },
  generateCodeForMergingSection: function(element: HTMLElement) {
  	let executions: string[] = [];
  	let lines: string[] = [];
  	FrontEndDOMHelper.recursiveGenerateCodeForMergingSection(element, executions, lines, true, EditorHelper.hasParentReactComponent(element));
    
    return [executions.join('\n'), lines.join('\n')];
  },
  recursiveGenerateCodeForMergingSection: function(element: HTMLElement, executions: string[], lines: string[], isFirstElement: boolean=true, hasParentReactComponent: boolean=true) {
  	if (HTMLHelper.hasClass(element, 'internal-fsb-accessory')) return;
    
    if (element && element.tagName) {
    	if (!isFirstElement && HTMLHelper.getAttribute(element, 'internal-fsb-react-mode')) return;
    	
    	if (!isFirstElement) {
    		let reusablePresetName = HTMLHelper.getAttribute(element, 'internal-fsb-reusable-preset-name') || null;
		    let presetId = HTMLHelper.getAttribute(element, 'internal-fsb-guid');
		    let attributes = null;
		    
		    if (reusablePresetName) {
		      attributes = HTMLHelper.getAttributes(element, false, {
		        style: StylesheetHelper.getStylesheetDefinition(presetId)
		      });
		    } else {
		      attributes = HTMLHelper.getAttributes(element, false);
		    }
    		
	    	let code, mapping;
	    	[code, mapping] = FrontEndReactHelper.generateMergingCode(attributes, hasParentReactComponent ? null : executions, true);
	    	
	    	if (code) lines.push(code);
    	}
    	
    	let children = [...element.childNodes];
      for (let child of children) {
        FrontEndDOMHelper.recursiveGenerateCodeForMergingSection(child, executions, lines, false, hasParentReactComponent);
      }
    }
  },
	getDataTableSchemaFromKey: (key: string, current: any, data: any): any => {
		const relation = (current && current.relations || {})[key];
		const table = (data.tables || {})[key];
		
		if (relation) {
			return (data.tables || {})[relation.targetGroup] || null;
		} else if (table) {
			return table;
		} else {
			return null;
		}
  },
  isNotationLeafNode: (notation: string): boolean => {
  	const data = {
  		tables: WorkspaceHelper.getDataFlows()
  	}
  	
  	const splited = notation.split(".");
		let shifted: string = splited.shift();
		let current: any = null;
		
		do {
		  current = FrontEndDOMHelper.getDataTableSchemaFromKey(shifted, current, data);
		  shifted = splited.shift();
		} while (current && shifted);
		
		return (current == null);
  }
};

export {FrontEndDOMHelper};