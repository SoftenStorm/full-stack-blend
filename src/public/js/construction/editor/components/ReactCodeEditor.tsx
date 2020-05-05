import {CodeHelper} from '../../helpers/CodeHelper.js';
import {IProps, IState, DefaultProps, DefaultState, Base} from './Base.js';
import {FullStackBlend, DeclarationHelper} from '../../helpers/DeclarationHelper.js';
import {CodeGenerationHelper, DEFAULTS} from '../../helpers/CodeGenerationHelper.js';
import {CAMEL_OF_EVENTS_DICTIONARY} from '../../Constants.js';

declare let React: any;
declare let ReactDOM: any;
declare let perform: any;
declare let ace: any;

interface Props extends IProps {
}

interface State extends IState {
   value: string
}

let ExtendedDefaultProps = Object.assign({}, DefaultProps);
let keys = [...Object.keys(CAMEL_OF_EVENTS_DICTIONARY)];
let watchingAttributeNames = [];
for (let name of keys) {
	watchingAttributeNames.push(name);
	watchingAttributeNames.push('internal-fsb-react-code-' + name);
}
watchingAttributeNames.push('internal-fsb-name');
watchingAttributeNames.push('internal-fsb-class');
watchingAttributeNames.push('internal-fsb-guid');
watchingAttributeNames.push('internal-fsb-react-namespace');
watchingAttributeNames.push('internal-fsb-react-class');
watchingAttributeNames.push('internal-fsb-react-id');
watchingAttributeNames.push('internal-fsb-react-mode');
watchingAttributeNames.push('internal-fsb-react-data');
watchingAttributeNames.push('internal-fsb-react-code-import');
watchingAttributeNames.push('internal-fsb-react-code-declare');
watchingAttributeNames.push('internal-fsb-react-code-interface');
watchingAttributeNames.push('internal-fsb-react-code-body');
watchingAttributeNames.push('internal-fsb-react-code-footer');

Object.assign(ExtendedDefaultProps, {
  watchingAttributeNames: watchingAttributeNames,
  watchingExtensionNames: ['autoGeneratedCode']
});

class ReactCodeEditor extends Base<Props, State> {
    protected static defaultProps: Props = ExtendedDefaultProps;

    constructor(props) {
        super(props);
        
        this.state = CodeHelper.clone(Object.assign({}, DefaultState, {
            value: ''
        }));
        
        window.define = ace.define;
        window.require = ace.require;
        
        ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/');
    }
    
    functionNameMapping: any = {}
    
    public update(properties: any) {
        if (!super.update(properties)) return;
        if (properties.tag == 'user-action') return;
        
        let code, mapping;
        if (this.state.attributeValues['internal-fsb-react-mode']) {
            let info = this.state.attributeValues;
            info.autoGeneratedCode = this.state.extensionValues['autoGeneratedCode'];
            
            [code, mapping] = CodeGenerationHelper.generateReactCode(info);
        } else {
            let info = this.state.attributeValues;
            info.autoGeneratedCode = this.state.extensionValues['autoGeneratedCode'];
            
        		[code, mapping] = CodeGenerationHelper.generateMergingCode(info);
        }
        this.functionNameMapping = mapping;
        
        if (this.state.value !== code) {
            this.state.value = code;
          
            let editor = ace.edit("reactEditor");
            editor.setValue(code);
            editor.clearSelection();
            
            this.forceUpdate();
        }
    }
    
    private onLoad() {
        let editor = ace.edit("reactEditor");
        
        let beginRegEx = /Auto\[[0-9a-zA-Z\:_]+\]--->/;
        let endRegEx = /<---Auto\[[0-9a-zA-Z\:_]+\]/;
        
        editor.commands.on("exec", (function(e) {
            let lines = this.state.value.split('\n');
        
            if (e.command && (e.command.name == 'backspace' || e.command.name == 'insertstring' || e.command.name == 'indent' || e.command.name == 'outdent')) {
                function checkAndPreventedFromEditing(rowCol) {
                    let isPreventedFromEditing = false;
                    
                    for (let i = rowCol.row; i >= 0; i--) {
                      if (lines[i].match(endRegEx) != null) break;
                      if (lines[i].match(beginRegEx) != null) {
                        isPreventedFromEditing = true;
                        break;
                      }
                    }
                    for (let i = rowCol.row; i < editor.session.getLength(); i++) {
                      if (lines[i].match(beginRegEx) != null) break;
                      if (lines[i].match(endRegEx) != null) {
                        isPreventedFromEditing = true;
                        break;
                      }
                    }
                    
                    if (rowCol.column == 0 && rowCol.row-1 >= 0 && e.command.name == 'backspace') {
                      if (lines[rowCol.row-1].match(endRegEx) != null) {
                         isPreventedFromEditing = true;
                      }
                    }
                    
                    if (isPreventedFromEditing) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                
                let getRange = editor.selection.getRange();
                checkAndPreventedFromEditing(getRange.start);
                checkAndPreventedFromEditing(getRange.end);
            }
        }).bind(this));
        
        editor.renderer.on('afterRender', (function() {
            let lines = this.state.value.split('\n');
            let aceLines = [...document.getElementById('reactEditor').getElementsByClassName('ace_line_group')];
            let offset = editor.getFirstVisibleRow();
            
            for (let j=0; j<aceLines.length; j++) {
                let readonly = false;
              
                for (let i = offset + j; i >= 0; i--) {
                    if (lines[i].match(endRegEx) != null) break;
                    if (lines[i].match(beginRegEx) != null) {
                        readonly = true;
                        break;
                    }
                }
                for (let i = offset + j; i < offset + aceLines.length; i++) {
                    if (lines[i].match(beginRegEx) != null) break;
                    if (lines[i].match(endRegEx) != null) {
                        readonly = true;
                        break;
                    }
                }
                
                if (aceLines[j]) {
                    aceLines[j].style.opacity = (readonly) ? 0.25 : 1.0;
                }
            }
        }).bind(this));
        
        editor.session.setUseWrapMode(true);
    }
    private onChange(value) {
        let editor = ace.edit("reactEditor");
        if (!editor.curOp || !editor.curOp.command.name) return;
      
        this.state.value = value;
      
        if (value) {
            let extractedInfo = CodeGenerationHelper.extractCode(value);
            let defaultDict = {
            		Import: "internal-fsb-react-code-import",
            		Declare: "internal-fsb-react-code-declare",
            		Interface: "internal-fsb-react-code-interface",
            		ClassBegin: "internal-fsb-react-code-body",
            		ClassEnd: "internal-fsb-react-code-footer"
            };
            
            let willUpdateAttributes = [];
            
            for (let key in extractedInfo) {
            		if (extractedInfo.hasOwnProperty(key)) {
            				if (defaultDict[key]) {
            						if (this.state.attributeValues['internal-fsb-react-mode']) {
		            						if (extractedInfo[key] != DEFAULTS[key] && this.state.attributeValues[defaultDict[key]] != extractedInfo[key]) {
		            								willUpdateAttributes.push({
		            										name: defaultDict[key],
		            										value: extractedInfo[key]
		            								});
		            						}
		            				}
            				} else if (this.functionNameMapping[key]) {
            						if (this.state.attributeValues[this.functionNameMapping[key]] != extractedInfo[key]) {
            								willUpdateAttributes.push({
            										name: this.functionNameMapping[key],
            										value: extractedInfo[key]
            								});
            						}
            				}
            		}
            }
            
            if (willUpdateAttributes.length != 0) {
		            perform('update', {
		            		attributes: willUpdateAttributes,
		                replace: (willUpdateAttributes.length != 1) ? null : willUpdateAttributes[0].name + '+text',
		                tag: 'user-action'
		            });
		        }
        }
    }
    
    render() {
      return (
      	<div>
      		<div style={{display: (this.state.value == '') ? 'none' : 'block'}}>
			  		<ReactAce.default style={{position: 'absolute', width: '100%', height: '100%'}}
			          name="reactEditor"
			          mode="typescript"
			          theme="tomorrow"
			          onLoad={this.onLoad.bind(this)}
			          onChange={this.onChange.bind(this)}
			          value={this.state.value}
			          fontSize={12}
			          showPrintMargin={false}
			          showGutter={true}
			          highlightActiveLine={true}
			          setOptions={{
			            useWorker: true,
			            showLineNumbers: true,
			            tabSize: 2
			         }}
			  		/>
			  	</div>
			  	<div className="text-center" style={{display: (this.state.value == '') ? 'block' : 'none'}}>
			  		<i className="fa fa-object-group" style={{fontSize: '50px', color: '#f0f0f0', paddingTop: '85px'}} />
			  	</div>
	      </div>
      )
    }
}

DeclarationHelper.declare('Components.ReactCodeEditor', ReactCodeEditor);

export {Props, State, ReactCodeEditor};