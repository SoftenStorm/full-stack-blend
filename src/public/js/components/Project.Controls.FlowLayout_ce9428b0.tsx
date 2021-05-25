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
class FlowLayout_ce9428b0 extends Base {
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
      div(style=Object.assign({}, this.props.forward && this.props.forward.styles || {}), className="internal-fsb-element " + (this.props.forward && this.props.forward.classes || ''), internal-fsb-guid="ce9428b0")
        .container-fluid(internal-fsb-event-no-propagate="1")
          .internal-fsb-strict-layout.row
            .col-12.col-sm-10.internal-fsb-element.offset-0.offset-md-1.offset-sm-1(style={'WebkitBorderRadius': '6px 6px 6px 6px', 'WebkitBoxShadow': '0px 6px 20px rgba(247, 151, 30, 0.3)', 'background': 'rgba(255, 249, 231, 1)', 'borderBottomColor': 'rgba(247, 151, 30, 1)', 'borderBottomStyle': 'solid', 'borderBottomWidth': '2px', 'borderLeftColor': 'rgba(247, 151, 30, 1)', 'borderLeftStyle': 'solid', 'borderLeftWidth': '2px', 'borderRadius': '6px 6px 6px 6px', 'borderRightColor': 'rgba(247, 151, 30, 1)', 'borderRightStyle': 'solid', 'borderRightWidth': '2px', 'borderTopColor': 'rgba(247, 151, 30, 1)', 'borderTopStyle': 'solid', 'borderTopWidth': '2px', 'boxShadow': '0px 6px 20px rgba(247, 151, 30, 0.3)', 'paddingBottom': '30px', 'paddingLeft': '30px', 'paddingRight': '30px', 'paddingTop': '30px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="FlowLayout 1", internal-fsb-guid="8bc4dc3d")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  .col-12.col-lg-8.col-md-7.col-xl-9.internal-fsb-element(style={'paddingLeft': '0px', 'paddingRight': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="FlowLayout 3", internal-fsb-guid="44837138")
                    .container-fluid(internal-fsb-event-no-propagate="1")
                      .internal-fsb-strict-layout.row
                        - const Project_Controls_FlowLayout_3c01e33c_0_ = Project.Controls.FlowLayout_3c01e33c;
                        _Project_Controls_FlowLayout_3c01e33c_0_(disabled=this.state && this.state.disabled || false, internal-fsb-event-no-propagate="1", internal-fsb-name="Control - Search 1", internal-fsb-react-code-body="
  
  // Declare class variables and functions here:
  //
  documentOnClickDelegate: any = null;
  
  protected initialize(): void {
    this.documentOnClickDelegate = this.hide.bind(this);
  }
  
  protected componentDidMount(): void {
  	this.register();
  	
  	document.body.addEventListener('click', this.documentOnClickDelegate, false);
  	
  	ReactDOM.findDOMNode(this.refs.title).value = this.getCookie('title') || '';
  	ReactDOM.findDOMNode(this.refs.quantity).value = this.getCookie('quantity') || '';
  	ReactDOM.findDOMNode(this.refs.unit).value = this.getCookie('unit') || '';
  }
  
  protected componentWillUnmount(): void {
  	document.body.removeEventListener('click', this.documentOnClickDelegate, false);
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string, inArray: boolean=false): any {
    if (notation && notation.indexOf('FilteredItems') == 0) {
      let results = [];
      
      if (!this.state.filteringValue) return results;
      
      if (cached[this.state.filteringValue.trim().toLowerCase()]) {
        results = cached[this.state.filteringValue.trim().toLowerCase()];
      } else {
        let tokens = this.state.filteringValue.trim().toLowerCase().split(' ');
        tokens = tokens.filter(token => !!token);
        
        results.push(
          {
            'FilteredItems': {
              source: null,
              group: 'FilteredItems',
              rows: [{
                keys: {},
                columns: {
                  title: this.state.filteringValue,
                  category: &quot;คุณเลือกที่จะระบุเองโดยมี WiseBoQ เป็นผู้ช่วยหาสินค้ามาให้คุณ&quot;,
                  description: &quot;คุณไม่ต้องห่วง.. หากไม่มีในรายการ WiseBoQ จะเป็นผู้หาสินค้านี้มาให้คุณเอง.. กรุณาระบุชื่อสินค้าให้ครบ (ชื่อวัสดุ, สเปค, ยี่ห้อ, รายละเอียด) ก่อนนำสินค้านี้ใส่รถเข็น&quot;,
                  image: null,
                  unit: &quot;&quot;
                },
                relations: {}
              }]
            }
          }
        );
        
        for (let item of PRODUCT_LIST) {
          const current = [item.category, item.productname, item.search, item.keyword].join(' ').toLowerCase();
          
          if (tokens.some(token => current.indexOf(token) == -1)) continue;
          if (results.length >= 100) break;
          
          results.push(
            {
              'FilteredItems': {
                source: null,
                group: 'FilteredItems',
                rows: [{
                  keys: {},
                  columns: {
                    title: item.productname,
                    category: item.category,
                    description: item.description,
                    image: item.picture.split(';')[0],
                    unit: item.unit
                  },
                  relations: {}
                }]
              }
            }
          );
        }
        
        cached[this.state.filteringValue.trim().toLowerCase()] = results;
      }
      
      const splited = notation.split(']');
      const index = splited[0];
      const key = splited[1];
      
      if (key) {
        return results[parseInt(index.split('[')[1])].columns[key.split('.')[1]];
      } else {
        return results;
      }
    } else {
      return super.getDataFromNotation(notation, inArray);
    }
  }
  
  private hide() {
    this.setState({
      show: false
    });
  }
  
  private show() {
    this.setState({
      show: true
    });
  }
  
  public reset() {
    ReactDOM.findDOMNode(this.refs.title).value = '';
    ReactDOM.findDOMNode(this.refs.quantity).value = '';
    ReactDOM.findDOMNode(this.refs.unit).value = '';
    
    ReactDOM.findDOMNode(this.refs.title).dispatchEvent(new Event('input', { bubbles: true }));
    ReactDOM.findDOMNode(this.refs.quantity).dispatchEvent(new Event('input', { bubbles: true }));
    ReactDOM.findDOMNode(this.refs.unit).dispatchEvent(new Event('input', { bubbles: true }));
  }
  
  public save() {
    this.setCookie('title', ReactDOM.findDOMNode(this.refs.title).value);
    this.setCookie('quantity', ReactDOM.findDOMNode(this.refs.quantity).value);
    this.setCookie('unit', ReactDOM.findDOMNode(this.refs.unit).value);
  }
  
  public dirty() {
    return (ReactDOM.findDOMNode(this.refs.title).value != '' ||
      ReactDOM.findDOMNode(this.refs.quantity).value != '' ||
      ReactDOM.findDOMNode(this.refs.unit).value != '');
  }
  
  private setCookie(c_name, value, exdays=30) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? &quot;&quot; : &quot;; expires=&quot; + exdate.toUTCString()) + &quot;; path=/&quot;;
    document.cookie = c_name + &quot;=&quot; + c_value;
  }
  
  private getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(&quot;;&quot;);
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf(&quot;=&quot;));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf(&quot;=&quot;) + 1);
      x = x.replace(/^\s+|\s+$/g, &quot;&quot;);
      if (x == c_name) {
          return unescape(y);
      }
    }
  }
  
  ", internal-fsb-react-code-declare="

// Declare private static variables here:
//
import {PRODUCT_LIST} from '../Constants2.js';

", internal-fsb-react-code-interface="

// Declare or extend interfaces here:
//
interface IProps extends IAutoBaseProps {
  disabled: boolean;
}
interface IState extends IAutoBaseState {
  show: boolean;
  filteringValue: string;
}

let DefaultProps = Object.assign({}, DefaultBaseProps, {
  disabled: false
});
let DefaultState = Object.assign({}, DefaultBaseState, {
  show: false,
  filteringValue: null
});

const cached = {};

", ref="inputs" , forward={'classes': 'col-12 offset-0', 'internal-fsb-name': 'Control - Search 1', 'styles': {'position': 'relative'}})
                  a.-fsb-preset-8d6b3390.btn.col-12.col-lg-4.col-md-5.col-xl-3.d-lg-block.d-md-block.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'FsbInheritedPresets': '8d6b3390', 'fontSize': '18px', 'left': '15px', 'lineHeight': '24px', 'marginBottom': '7px', 'marginTop': '0px', 'paddingBottom': '9px', 'paddingTop': '9px', 'position': 'relative'}, href="/buyer/auction/new", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 1", internal-fsb-guid="74cd2e01")
                    .internal-fsb-element(style={'marginTop': '11px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="74cd2e01-text")
                      div
                        | เพิ่มสินค้านี้ใส่รถเข็น
                        br
                  a.-fsb-preset-8d6b3390.btn.col-12.d-block.d-lg-none.d-md-none.d-sm-block.d-xl-none.internal-fsb-element.offset-0(style={'FsbInheritedPresets': '8d6b3390', 'fontSize': '18px', 'lineHeight': '24px', 'marginTop': '15px', 'paddingLeft': '0px', 'paddingRight': '0px'}, href="/buyer/auction/new", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 2", internal-fsb-guid="1777a991")
                    .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="1777a991-text")
                      | เพิ่มสินค้าใส่รถเข็น
    `
  }
}
DeclarationHelper.declare('Site', 'Controls.FlowLayout_ce9428b0', FlowLayout_ce9428b0);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState};



// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.