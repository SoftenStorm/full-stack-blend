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
class Footer extends Base {
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
  	
  	// Start of LiveChat (www.livechatinc.com) code
    // 
    window.setTimeout(() => {
      if (window.location.pathname.indexOf('/buyer') != -1) {
        window.__lc = window.__lc || {};
        window.__lc.license = 12334341;
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.body.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
      }
    }, 1000);
    // End of LiveChat code
  }
  
  protected componentWillUnmount(): void {
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string, inArray: boolean=false): any {
    return super.getDataFromNotation(notation, inArray);
  }
  
  
  
  // Auto[Merging]--->
  // <---Auto[Merging]
  
  // Auto[ClassEnd]--->
  protected render(): any {
    TestHelper.identify();
    return pug `
      div(style=Object.assign({'background': 'rgba(255, 255, 255, 0)', 'borderBottomColor': 'rgba(237, 237, 237, 1)', 'borderTopColor': 'rgba(22, 98, 250, 1)', 'paddingLeft': '0px', 'paddingRight': '0px', 'pointerEvents': 'none', position: (()=>{return 'static';})()}, this.props.forward && this.props.forward.styles || {}), className="internal-fsb-element offset--1 " + (this.props.forward && this.props.forward.classes || ''), internal-fsb-guid="d22b95d9")
        .container-fluid(internal-fsb-event-no-propagate="1")
          .internal-fsb-strict-layout.row
            .col-12.d-block.d-lg-block.d-md-block.d-sm-block.d-xl-block.internal-fsb-element(style={'paddingLeft': '0px', 'paddingRight': '0px', 'paddingTop': '50px', 'visibility': 'hidden'}, internal-fsb-event-no-propagate="1", internal-fsb-name="For Adjusting Height", internal-fsb-guid="bb40aaea")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  - const Project_Controls_FlowLayout_d4e586d5_0_ = Project.Controls.FlowLayout_d4e586d5;
                  _Project_Controls_FlowLayout_d4e586d5_0_(internal-fsb-event-no-propagate="1", internal-fsb-name="Footer Content (Copy)", forward={'classes': 'col-12 col-lg-10 offset-lg-1', 'internal-fsb-name': 'Footer Content (Copy)', 'styles': {}})
            .col-12.internal-fsb-element(style={'display': 'none'}, internal-fsb-event-no-propagate="1", internal-fsb-inner-html="<style type=&quot;text/css&quot;>
html,
body, 
.internal-fsb-begin {
  min-height: 100%;
  position: relative;
}
</style>", internal-fsb-name="HTML 1", dangerouslySetInnerHTML={__html: "<style type=\"text/css\">\nhtml,\nbody, \n.internal-fsb-begin {\n  min-height: 100%;\n  position: relative;\n}\n</style>"}, internal-fsb-guid="79e11b72")
            .col-12.internal-fsb-element(style={'bottom': '0px', 'left': '0px', 'paddingLeft': '0px', 'paddingRight': '0px', 'position': 'absolute', 'right': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Container", internal-fsb-guid="27c03508")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  .col-12.internal-fsb-element(style={'background': 'rgba(246, 246, 246, 1)', 'paddingLeft': '0px', 'paddingRight': '0px', 'pointerEvents': 'auto'}, internal-fsb-event-no-propagate="1", internal-fsb-name="For Displaying", internal-fsb-guid="3802b669")
                    .container-fluid(internal-fsb-event-no-propagate="1")
                      .internal-fsb-strict-layout.row
                        - const Project_Controls_FlowLayout_d4e586d5_1_ = Project.Controls.FlowLayout_d4e586d5;
                        _Project_Controls_FlowLayout_d4e586d5_1_(internal-fsb-event-no-propagate="1", internal-fsb-name="Footer Content", forward={'classes': 'col-12 col-lg-10 offset-lg-1', 'internal-fsb-name': 'Footer Content', 'styles': {}})
    `
  }
}
DeclarationHelper.declare('Site', 'Common.Footer', Footer);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState};



// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.