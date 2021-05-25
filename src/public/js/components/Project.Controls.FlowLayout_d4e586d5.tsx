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
class FlowLayout_d4e586d5 extends Base {
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
      div(style=Object.assign({'background': 'rgba(255, 255, 255, 0)', 'borderBottomColor': 'rgba(237, 237, 237, 1)', 'borderTopColor': 'rgba(22, 98, 250, 1)', 'fontFamily': 'Prompt', 'fontSize': '16px', 'fontWeight': '400', 'lineHeight': '24px', 'paddingBottom': '64px', 'paddingLeft': '0px', 'paddingTop': '50px'}, this.props.forward && this.props.forward.styles || {}), className="internal-fsb-element " + (this.props.forward && this.props.forward.classes || ''), internal-fsb-guid="d4e586d5")
        .container-fluid(internal-fsb-event-no-propagate="1")
          .internal-fsb-strict-layout.row
            .col-4.d-lg-block.d-md-block.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'paddingLeft': '0px', 'paddingRight': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="For Large Screen", internal-fsb-guid="0836d2d7")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  - const Project_Controls_FlowLayout_a4eb9278_0_ = Project.Controls.FlowLayout_a4eb9278;
                  _Project_Controls_FlowLayout_a4eb9278_0_(internal-fsb-event-no-propagate="1", internal-fsb-name="Business Information", forward={'classes': 'col-12', 'internal-fsb-name': 'Business Information', 'styles': {'marginTop': '20px'}})
            .-fsb-self-12cc8525.col-12.col-md-8.internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="Sitemap", internal-fsb-reusable-preset-name="v2_sitemap ", internal-fsb-guid="12cc8525")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  .-fsb-self-94e83732.col-12.col-md-4.internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="News", internal-fsb-reusable-preset-name="v2_sitemap_box ", internal-fsb-guid="94e83732")
                    .container-fluid(internal-fsb-event-no-propagate="1")
                      .internal-fsb-strict-layout.row
                        .-fsb-self-678d5756.col-12.internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="Title", internal-fsb-reusable-preset-name="v2_sitemap_box_title ", internal-fsb-guid="678d5756")
                          | มีอะไรใหม่
                        a.-fsb-preset-318669de.-fsb-self-51bc3ed6.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de', 'FsbReusableId': '51bc3ed6', 'FsbReusableName': ''}, href="https://www.wiseboq.com/article/seo/metal/ราคาเหล็กวันนี้+เช็ค+สืบราคาเหล็ก", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 1", internal-fsb-guid="51bc3ed6")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="51bc3ed6-text")
                            | ราคาเหล็กวันนี้
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="https://www.wiseboq.com/article/71/%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B9%80%E0%B8%AA%E0%B8%B2%E0%B9%80%E0%B8%82%E0%B9%87%E0%B8%A1+%E0%B8%97%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 2", internal-fsb-guid="9391b00d")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="9391b00d-text")
                            | ราคาเสาเข็มวันนี้
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="https://www.wiseboq.com/article/seo/concrete/ราคาคอนกรีตผสมเสร็จ", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 3", internal-fsb-guid="0cd3ccc6")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="0cd3ccc6-text")
                            | ราคาคอนกรีตผสมเสร็จ
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="/blog/all", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 4", internal-fsb-guid="11800dc3")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="11800dc3-text")
                            | บทความเพิ่มเติม
                  .-fsb-preset-94e83732.-fsb-self-bb817ce6.col-12.col-md-4.internal-fsb-element(style={'FsbInheritedPresets': '94e83732', 'FsbReusableId': 'bb817ce6', 'FsbReusableName': ''}, internal-fsb-event-no-propagate="1", internal-fsb-name="Buyer", internal-fsb-guid="bb817ce6")
                    .container-fluid(internal-fsb-event-no-propagate="1")
                      .internal-fsb-strict-layout.row
                        .-fsb-preset-678d5756.col-12.internal-fsb-element(style={'FsbInheritedPresets': '678d5756'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Title", internal-fsb-guid="9a201d9a")
                          | สำหรับผู้ซื้อ
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="/buyer/auction", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 1", internal-fsb-guid="61e132cc")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="61e132cc-text")
                            | ติดตามรายการวัสดุ
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="/buyer", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 2", internal-fsb-guid="e8be3959")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="e8be3959-text")
                            | เรียนรู้การสั่งซื้อ
                  .-fsb-preset-94e83732.col-12.col-md-4.internal-fsb-element(style={'FsbInheritedPresets': '94e83732'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Bidder", internal-fsb-guid="7b10c44c")
                    .container-fluid(internal-fsb-event-no-propagate="1")
                      .internal-fsb-strict-layout.row
                        .-fsb-preset-678d5756.col-12.internal-fsb-element(style={'FsbInheritedPresets': '678d5756'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Title", internal-fsb-guid="95b90319")
                          | สำหรับร้านค้า
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="/bidder/auction", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 1", internal-fsb-guid="543841ee")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="543841ee-text")
                            | สแตนบายประกวดราคา
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="https://www.wiseboq.com/article/1/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B8%E0%B8%81%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A5%E0%B8%94%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%88%E0%B9%88%E0%B8%B2%E0%B8%A2", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 2", internal-fsb-guid="54d83d64")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="54d83d64-text")
                            | วิธีเพิ่มยอดขายและลดค่าใช้จ่าย
                        a.-fsb-preset-318669de.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de'}, href="/bidder", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 3", internal-fsb-guid="ae1b3ce2")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="ae1b3ce2-text")
                            | เรียนรู้การประกวดราคา
                        a.-fsb-preset-318669de.-fsb-self-ba7aa9ec.col-12.internal-fsb-element(style={'FsbInheritedPresets': '318669de', 'FsbReusableId': 'ba7aa9ec', 'FsbReusableName': ''}, href="/bidder/referral", internal-fsb-event-no-propagate="1", internal-fsb-name="Link 4", internal-fsb-guid="ba7aa9ec")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="ba7aa9ec-text")
                            | โปรแกรมรีเฟอร์รัล
            .col-12.d-block.d-lg-none.d-md-none.d-sm-block.d-xl-none.internal-fsb-element(style={'paddingLeft': '0px', 'paddingRight': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="For Small Screen", internal-fsb-guid="b8869c41")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  - const Project_Controls_FlowLayout_a4eb9278_1_ = Project.Controls.FlowLayout_a4eb9278;
                  _Project_Controls_FlowLayout_a4eb9278_1_(internal-fsb-event-no-propagate="1", internal-fsb-name="Business Information (Copy)", forward={'classes': 'col-12', 'internal-fsb-name': 'Business Information (Copy)', 'styles': {'marginTop': '40px'}})
    `
  }
}
DeclarationHelper.declare('Site', 'Controls.FlowLayout_d4e586d5', FlowLayout_d4e586d5);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState};



// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.