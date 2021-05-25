// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.


// Auto[Import]--->
import {Project as $Project, DeclarationHelper} from '../helpers/DeclarationHelper';
import {CodeHelper} from '../helpers/CodeHelper';
import {EventHelper} from '../helpers/EventHelper';
import {HTMLHelper} from '../helpers/HTMLHelper';
import {AnimationHelper} from '../helpers/AnimationHelper';
import {TestHelper} from '../helpers/TestHelper';
import {IBaseProps, IBaseState, DefaultBaseProps, DefaultBaseState, Button as $Button, Base} from './Base';
// <---Auto[Import]

// Import additional modules here:
//

// Auto[Declare]--->

declare let React: any;
declare let ReactDOM: any;
declare let window: any;
declare let DataManipulationHelper: any;
declare let pug: any;

let Button = $Button;
let Project = $Project;

// <---Auto[Declare]

// Declare private static variables here:
//

// Auto[Interface]--->
interface IAutoBaseProps extends IBaseProps {
  forward: {classes: String, styles: any};
}
interface IAutoBaseState extends IBaseState {
}
// <---Auto[Interface]

// Declare or extend interfaces here:
//
interface IProps extends IAutoBaseProps {
  
}
interface IState extends IAutoBaseState { 
}

let DefaultProps = Object.assign({}, DefaultBaseProps, {
  
});
let DefaultState = Object.assign({}, DefaultBaseState, {
  
});

// Auto[ClassBegin]--->
class FlowLayout_e5573703 extends Base {
  state: IState = null;
  protected static defaultProps: IProps = DefaultProps;
  
  constructor(props) {
    super(props);
    this.state = CodeHelper.clone(DefaultState);
    
    this.initialize();
  }
  
  register() {
    TestHelper.identify();
    function ready(a){"loading"!=document.readyState?a(new Event('ready')):document.addEventListener?document.addEventListener("DOMContentLoaded",a):(document.onreadystatechange=function(e){"complete"==document.readyState&&a(e)})};
        
  }
  // <---Auto[ClassBegin]
  
  // Declare class variables and functions here:
  //
  protected initialize(): void {
  }
  
  protected componentDidMount(): void {
  	this.register();
  }
  
  protected componentWillUnmount(): void {
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string, inArray: boolean=false, always: boolean=false): any {
    return super.getDataFromNotation(notation, inArray, always);
  }
  
  
  // Auto[Merging]--->
  // <---Auto[Merging]
  
  // Auto[ClassEnd]--->
  protected render(): any {
    TestHelper.identify();
    return pug `
      div(style=Object.assign({'paddingLeft': '0px', 'paddingRight': '0px', 'zIndex': '1000'}, this.props.forward && this.props.forward.styles || {}), className="internal-fsb-element " + (this.props.forward && this.props.forward.classes || ''), internal-fsb-guid="e5573703")
        .container-fluid(internal-fsb-event-no-propagate="1")
          .internal-fsb-strict-layout.row
            - const Project_Common_NavigationBar_0_ = Project.Common.NavigationBar;
            _Project_Common_NavigationBar_0_(internal-fsb-event-no-propagate="1", internal-fsb-name="Main Navigation", internal-fsb-react-code-body="
  
  // Declare class variables and functions here:
  //
  protected initialize(): void {
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string): any {
    return super.getDataFromNotation(notation);
  }
  
  ", internal-fsb-react-code-declare="

// Declare private static variables here:
//
Project['Controls'] = Project['Controls'] || {};

", internal-fsb-react-code-footer="

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState,};
", internal-fsb-react-code-import="

// Import additional modules here:
//Project['Controls'] =

", forward={'classes': 'col-12', 'internal-fsb-name': 'Main Navigation', 'styles': {}})
    `
  }
}
DeclarationHelper.declare('Site', 'Controls.FlowLayout_e5573703', FlowLayout_e5573703);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState};



// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.