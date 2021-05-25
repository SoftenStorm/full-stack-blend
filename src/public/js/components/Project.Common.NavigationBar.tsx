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
//Project['Controls'] =

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
Project['Controls'] = Project['Controls'] || {};

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
class NavigationBar extends Base {
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
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string): any {
    return super.getDataFromNotation(notation);
  }
  
  
  
  // Auto[Merging]--->
  // <---Auto[Merging]
  
  // Auto[ClassEnd]--->
  protected render(): any {
    TestHelper.identify();
    return pug `
      div(style=Object.assign({'FsbInheritedPresets': '', 'paddingLeft': '0px', 'paddingRight': '0px'}, this.props.forward && this.props.forward.styles || {}), className="internal-fsb-element " + (this.props.forward && this.props.forward.classes || ''), internal-fsb-guid="535be65e")
        .container-fluid(internal-fsb-event-no-propagate="1")
          .internal-fsb-strict-layout.row(style={'display': 'block'})
            .col-12.internal-fsb-element(style={'paddingLeft': '15px', 'paddingRight': '15px', 'visibility': 'hidden'}, internal-fsb-event-no-propagate="1", internal-fsb-name="For Adjusting Height", internal-fsb-guid="28289e58")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  - const Project_Controls_FlowLayout_44724940_0_ = Project.Controls.FlowLayout_44724940;
                  _Project_Controls_FlowLayout_44724940_0_(internal-fsb-event-no-propagate="1", internal-fsb-name="Main Navigation Content (Copy)", internal-fsb-react-code-body="
  
  // Declare class variables and functions here:
  //
  protected initialize(): void {
  }
  
  protected componentDidMount(): void {
  	this.register();
  	
  	document.body.addEventListener('click', (() => {
  	  this.setState({
  	    isDisplayingMenu: false
  	  });
  	}).bind(this));
  }
  
  protected componentWillUnmount(): void {
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string, inArray: boolean=false): any {
    return super.getDataFromNotation(notation, inArray);
  }
  
  private getMenuIndex(): number {
    const pathname = window.location.pathname;
    
    if (!pathname || pathname == '/') {
      return 0;
    }
    if (pathname.indexOf('/buyer') == 0) {
      return 1;
    }
    if (pathname.indexOf('/bidder') == 0) {
      return 2;
    }
    if (pathname.indexOf('/blog') == 0 || pathname.indexOf('/article') == 0) {
      return 3;
    }
    if (pathname.indexOf('/buyer/auction') == 0 && pathname.indexOf('/buyer/auction/result') == -1) {
      return 5;
    }
    if (pathname.indexOf('/authentication') == 0) {
      return 6;
    }
  }
  
  ", internal-fsb-react-code-declare="

// Declare private static variables here:
//
const state = document.cookie || '';
window.loggingIn = state.indexOf('loggingIn=true') != -1;

", internal-fsb-react-code-interface="

// Declare or extend interfaces here:
//
interface IProps extends IAutoBaseProps {
  
}
interface IState extends IAutoBaseState {
  isDisplayingMenu: boolean;
  loginText: string;
}

let DefaultProps = Object.assign({}, DefaultBaseProps, {
  
});
let DefaultState = Object.assign({}, DefaultBaseState, {
  isDisplayingMenu: false,
  loginText: window.loggingIn ? 'ออกจากระบบ' : 'เข้าสู่ระบบ'
});

", forward={'classes': 'col-12 col-xl-10 offset-xl-1', 'internal-fsb-name': 'Main Navigation Content (Copy)', 'styles': {}})
            .internal-fsb-element(style={'left': '0px', 'paddingLeft': '15px', 'paddingRight': '15px', 'position': 'absolute', 'right': '0px', 'top': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="For Displaying", internal-fsb-guid="62e6447b")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  - const Project_Controls_FlowLayout_44724940_1_ = Project.Controls.FlowLayout_44724940;
                  _Project_Controls_FlowLayout_44724940_1_(internal-fsb-event-no-propagate="1", internal-fsb-name="Main Navigation Content", internal-fsb-react-code-body="
  
  // Declare class variables and functions here:
  //
  protected initialize(): void {
  }
  
  protected componentDidMount(): void {
  	this.register();
  	
  	document.body.addEventListener('click', (() => {
  	  this.setState({
  	    isDisplayingMenu: false
  	  });
  	}).bind(this));
  }
  
  protected componentWillUnmount(): void {
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string, inArray: boolean=false): any {
    return super.getDataFromNotation(notation, inArray);
  }
  
  private getMenuIndex(): number {
    const pathname = window.location.pathname;
    
    if (!pathname || pathname == '/') {
      return 0;
    }
    if (pathname.indexOf('/buyer') == 0) {
      return 1;
    }
    if (pathname.indexOf('/bidder') == 0) {
      return 2;
    }
    if (pathname.indexOf('/blog') == 0 || pathname.indexOf('/article') == 0) {
      return 3;
    }
    if (pathname.indexOf('/buyer/auction') == 0 && pathname.indexOf('/buyer/auction/result') == -1) {
      return 5;
    }
    if (pathname.indexOf('/authentication') == 0) {
      return 6;
    }
  }
  
  ", internal-fsb-react-code-declare="

// Declare private static variables here:
//
const state = document.cookie || '';
window.loggingIn = state.indexOf('loggingIn=true') != -1;

", internal-fsb-react-code-interface="

// Declare or extend interfaces here:
//
interface IProps extends IAutoBaseProps {
  
}
interface IState extends IAutoBaseState {
  isDisplayingMenu: boolean;
  loginText: string;
}

let DefaultProps = Object.assign({}, DefaultBaseProps, {
  
});
let DefaultState = Object.assign({}, DefaultBaseState, {
  isDisplayingMenu: false,
  loginText: window.loggingIn ? 'ออกจากระบบ' : 'เข้าสู่ระบบ'
});

", forward={'classes': 'col-12 col-xl-10 offset-xl-1', 'internal-fsb-name': 'Main Navigation Content', 'styles': {}})
    `
  }
}
DeclarationHelper.declare('Site', 'Common.NavigationBar', NavigationBar);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState,};



// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.