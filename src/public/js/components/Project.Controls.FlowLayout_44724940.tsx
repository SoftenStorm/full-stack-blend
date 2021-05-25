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
const state = document.cookie || '';
window.loggingIn = state.indexOf('loggingIn=true') != -1;

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
  isDisplayingMenu: boolean;
  loginText: string;
}

let DefaultProps = Object.assign({}, DefaultBaseProps, {
  
});
let DefaultState = Object.assign({}, DefaultBaseState, {
  isDisplayingMenu: false,
  loginText: window.loggingIn ? 'ออกจากระบบ' : 'เข้าสู่ระบบ'
});

// Auto[ClassBegin]--->
class FlowLayout_44724940 extends Base {
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
  
  
  
  // Auto[Merging]--->
  protected onLinkClick_a32ecda1(event: Event) {

    // Handle the event of onLinkClick (Menu) here:
    // 
    this.setState({
      isDisplayingMenu: !this.state.isDisplayingMenu
    });
    
  }


  protected onHTMLClick_897d09bb(event: Event) {

    // Handle the event of onHTMLClick (Logo) here:
    // 
    window.location = '/';
    
  }
  // <---Auto[Merging]
  
  // Auto[ClassEnd]--->
  protected render(): any {
    TestHelper.identify();
    return pug `
      div(style=Object.assign({'paddingLeft': '0px', 'paddingRight': '0px'}, this.props.forward && this.props.forward.styles || {}), className="internal-fsb-element " + (this.props.forward && this.props.forward.classes || ''), internal-fsb-guid="44724940")
        .container-fluid(internal-fsb-event-no-propagate="1")
          .internal-fsb-strict-layout.row
            .internal-fsb-element(style={'display': 'none'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Template", internal-fsb-guid="01008409")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  a.-fsb-preset-ac0bee2c.-fsb-self-ac0bee2c.btn.d-lg-block.d-md-none.d-none.d-sm-none.d-xl-block.internal-fsb-element(href="/", internal-fsb-event-no-propagate="1", internal-fsb-name="Home", internal-fsb-reusable-preset-name="v2_menu_item__", internal-fsb-guid="ac0bee2c")
                    .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="ac0bee2c-text")
                      | หน้าแรก
            .col-8.col-md-3.internal-fsb-element(style={'paddingLeft': '0px', 'paddingRight': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Left", internal-fsb-guid="1d76305e")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  a.btn.d-block.d-lg-none.d-md-none.d-sm-block.d-xl-none.internal-fsb-element(style={'FsbInheritedPresets': '', 'background': 'rgba(11, 75, 136, 1)', 'color': 'rgba(255, 255, 255, 1)', 'height': '42px', 'marginRight': '10px', 'marginTop': '40px', 'paddingBottom': '8px', 'paddingLeft': '20px', 'paddingRight': '20px', 'paddingTop': '8px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Menu", internal-fsb-react-code-onfsbclick="

    // Handle the event of onLinkClick (Menu) here:
    // 
    this.setState({
      isDisplayingMenu: !this.state.isDisplayingMenu
    });
    
    ", onClick=this.onLinkClick_a32ecda1.bind(this), internal-fsb-guid="a32ecda1")
                    .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="a32ecda1-text")
                      | ☰
                  .col-1.internal-fsb-element(style={'cursor': 'pointer', 'marginTop': '28px', 'paddingLeft': '0px', 'paddingRight': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-inner-html="<svg width=&quot;162&quot; height=&quot;56&quot; viewBox=&quot;0 0 162 56&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>
<path d=&quot;M159.682 51.8631V20.5716L127.189 1.85229H127.154L112.027 10.6736L134.845 24.2761L134.729 51.8631H159.682Z&quot; fill=&quot;#FEDB71&quot;/>
<path d=&quot;M5.82351 51.7124L0 29.7053H4.31543L8.28284 47.2207L12.9463 29.7053H17.3893L21.9251 47.2207L25.8926 29.7053H30.2428L24.2569 51.7124H19.4658L15.0924 35.401L10.5798 51.7124H5.82351Z&quot; fill=&quot;#273542&quot;/>
<path d=&quot;M36.6578 36.6746H32.7716V51.7241H36.6578V36.6746Z&quot; fill=&quot;#273542&quot;/>
<path d=&quot;M47.0754 52.0829C45.7413 52.0829 44.5581 51.863 43.5488 51.4346C42.5395 50.9947 41.7275 50.3928 41.1127 49.6287C40.5094 48.8646 40.1382 47.9733 40.0222 46.9545H43.9432C44.0592 47.5449 44.3956 48.0427 44.9293 48.4595C45.4629 48.8762 46.1589 49.0846 47.0174 49.0846C47.8642 49.0846 48.4907 48.911 48.8851 48.5637C49.2795 48.2164 49.4767 47.8228 49.4767 47.3828C49.4767 46.7346 49.1983 46.2946 48.6299 46.0631C48.0614 45.8316 47.2726 45.6001 46.2633 45.3801C45.6137 45.2412 44.9525 45.0675 44.2912 44.8591C43.6184 44.6623 43.0036 44.3961 42.4467 44.0835C41.8899 43.7709 41.4375 43.3658 41.0895 42.868C40.7415 42.3702 40.5674 41.7566 40.5674 41.0273C40.5674 39.696 41.1011 38.5731 42.1683 37.6585C43.2356 36.744 44.7321 36.2925 46.6578 36.2925C48.4443 36.2925 49.8595 36.7092 50.9268 37.5312C51.9941 38.3647 52.6205 39.4992 52.8293 40.9578H49.1519C48.9315 39.8465 48.0846 39.2908 46.623 39.2908C45.8921 39.2908 45.3353 39.4297 44.9409 39.7191C44.5465 39.997 44.3492 40.3559 44.3492 40.7842C44.3492 41.2241 44.6393 41.583 45.2309 41.8492C45.8225 42.1155 46.5998 42.3586 47.5742 42.5786C48.6299 42.8217 49.5927 43.0879 50.4744 43.3773C51.356 43.6668 52.0637 44.1067 52.5857 44.6855C53.1077 45.2643 53.3745 46.0863 53.3745 47.1629C53.3977 48.089 53.1541 48.9341 52.6437 49.6866C52.1333 50.4391 51.4024 51.0179 50.4512 51.4462C49.4999 51.863 48.3747 52.0829 47.0754 52.0829Z&quot; fill=&quot;#273542&quot;/>
<path d=&quot;M63.328 52.0831C61.8083 52.0831 60.4626 51.7589 59.2793 51.1106C58.1077 50.4624 57.1796 49.5478 56.5184 48.3786C55.8456 47.2093 55.5208 45.8549 55.5208 44.3152C55.5208 42.7524 55.8456 41.3747 56.5068 40.1592C57.168 38.9437 58.0729 38.006 59.2445 37.3229C60.4046 36.6399 61.7851 36.3042 63.3628 36.3042C64.8476 36.3042 66.1469 36.6283 67.2838 37.2766C68.4206 37.9249 69.3023 38.8047 69.9403 39.9277C70.5783 41.0506 70.9032 42.3009 70.9032 43.6785C70.9032 43.8984 70.9032 44.13 70.8916 44.3731C70.88 44.6162 70.8684 44.8709 70.8452 45.1371H59.3838C59.465 46.3064 59.871 47.2325 60.6134 47.8924C61.3559 48.5638 62.2491 48.8879 63.3048 48.8879C64.0936 48.8879 64.7548 48.7143 65.3001 48.3554C65.8337 47.9965 66.2397 47.5451 66.5065 46.9778H70.4623C70.1839 47.9271 69.7083 48.7953 69.0471 49.571C68.3858 50.3466 67.5738 50.9601 66.6109 51.4116C65.6249 51.8631 64.5344 52.0831 63.328 52.0831ZM63.3512 39.4646C62.3999 39.4646 61.5531 39.7309 60.8222 40.2634C60.0914 40.7959 59.6274 41.6178 59.4186 42.706H66.9358C66.8777 41.7105 66.5065 40.9233 65.8453 40.3444C65.1725 39.754 64.3488 39.4646 63.3512 39.4646Z&quot; fill=&quot;#273542&quot;/>
<path d=&quot;M74.2667 51.7124V29.7053H83.118C85.4033 29.7053 87.155 30.2378 88.3615 31.2913C89.5679 32.3448 90.1712 33.7108 90.1712 35.3663C90.1712 36.7439 89.7999 37.8552 89.0575 38.6772C88.3151 39.5107 87.3986 40.0664 86.3314 40.3558C87.5958 40.6105 88.6283 41.2356 89.4519 42.2312C90.2756 43.2268 90.6816 44.3844 90.6816 45.7042C90.6816 47.4406 90.0551 48.8761 88.7907 50.0106C87.5262 51.1451 85.7397 51.7124 83.4312 51.7124H74.2667ZM78.3037 38.955H82.5264C83.6632 38.955 84.5333 38.6887 85.1365 38.1678C85.7397 37.6469 86.0529 36.8944 86.0529 35.9335C86.0529 35.0074 85.7513 34.2781 85.1597 33.7455C84.5565 33.213 83.6632 32.9468 82.4684 32.9468H78.3037V38.955ZM78.3037 48.4478H82.8048C83.9996 48.4478 84.9277 48.17 85.5889 47.6143C86.2501 47.0586 86.5866 46.283 86.5866 45.2758C86.5866 44.2455 86.2385 43.4467 85.5425 42.8563C84.8465 42.2659 83.9184 41.9765 82.7352 41.9765H78.3037V48.4478Z&quot; fill=&quot;#F7971E&quot;/>
<path d=&quot;M101.146 52.083C99.6843 52.083 98.3734 51.7472 97.2134 51.0874C96.0533 50.4159 95.1253 49.4898 94.4524 48.309C93.768 47.1282 93.4316 45.7506 93.4316 44.1993C93.4316 42.6365 93.7796 41.2704 94.464 40.0896C95.1485 38.9088 96.0765 37.9827 97.2482 37.3113C98.4082 36.6398 99.7307 36.3157 101.181 36.3157C102.619 36.3157 103.919 36.6514 105.09 37.3113C106.25 37.9827 107.178 38.9088 107.851 40.0896C108.536 41.2704 108.872 42.6481 108.872 44.1993C108.872 45.7622 108.536 47.1282 107.851 48.309C107.167 49.4898 106.25 50.4159 105.067 51.0874C103.895 51.7472 102.584 52.083 101.146 52.083ZM101.146 48.7142C102.155 48.7142 103.037 48.3322 103.791 47.5797C104.545 46.8156 104.916 45.6927 104.916 44.1993C104.916 42.7059 104.545 41.5714 103.791 40.819C103.037 40.0549 102.167 39.6845 101.181 39.6845C100.148 39.6845 99.2551 40.0665 98.5242 40.819C97.7818 41.583 97.4106 42.7059 97.4106 44.1993C97.4106 45.6927 97.7818 46.8272 98.5242 47.5797C99.2551 48.3322 100.137 48.7142 101.146 48.7142Z&quot; fill=&quot;#F7971E&quot;/>
<path d=&quot;M121.818 52.0829C119.695 52.0829 117.827 51.6199 116.238 50.6822C114.648 49.7561 113.396 48.4595 112.502 46.8156C111.598 45.1717 111.145 43.2616 111.145 41.0968C111.145 38.9319 111.598 37.0218 112.502 35.3779C113.407 33.7341 114.648 32.4375 116.238 31.5114C117.827 30.5852 119.683 30.1106 121.818 30.1106C123.929 30.1106 125.785 30.5737 127.386 31.5114C128.987 32.4375 130.228 33.7341 131.121 35.3779C132.015 37.0218 132.455 38.9319 132.455 41.0968C132.455 43.1227 132.061 44.9286 131.272 46.5146C130.483 48.1006 129.393 49.3624 127.989 50.2886L132.919 55.5675H128.082L124.741 51.7472C123.801 51.9672 122.827 52.0829 121.818 52.0829ZM121.818 48.5868C123.848 48.5868 125.46 47.9154 126.667 46.5841C127.873 45.2528 128.476 43.4237 128.476 41.0968C128.476 38.7699 127.873 36.9408 126.667 35.6095C125.46 34.2782 123.848 33.6067 121.818 33.6067C119.788 33.6067 118.175 34.2782 116.957 35.6095C115.739 36.9408 115.136 38.7699 115.136 41.0968C115.136 43.4237 115.739 45.2528 116.957 46.5841C118.175 47.927 119.788 48.5868 121.818 48.5868Z&quot; fill=&quot;#F7971E&quot;/>
<path d=&quot;M139.254 53.7501V21.6482L117.886 9.33072L95.5893 22.1807L93.7332 18.974L114.173 7.18906L108.605 3.98234L77.9447 21.6482V25.9315H74.2325V19.5065L108.095 0H109.116L117.886 5.05897L126.656 0H127.677L161.527 19.5065V53.7153L139.254 53.7501ZM121.598 7.18906L142.966 19.5065V50.034L157.827 50.0108V21.6482L127.178 3.98234L121.598 7.18906Z&quot; fill=&quot;#F7971E&quot;/>
<path d=&quot;M36.6462 35.2623L32.7716 36.6399V32.7618L36.6462 31.3958V35.2623Z&quot; fill=&quot;#F7971E&quot;/>
</svg>
", internal-fsb-name="Logo", internal-fsb-react-code-onfsbclick="

    // Handle the event of onHTMLClick (Logo) here:
    // 
    window.location = '/';
    
    ", dangerouslySetInnerHTML={__html: "<svg width=\"162\" height=\"56\" viewBox=\"0 0 162 56\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M159.682 51.8631V20.5716L127.189 1.85229H127.154L112.027 10.6736L134.845 24.2761L134.729 51.8631H159.682Z\" fill=\"#FEDB71\"/>\n<path d=\"M5.82351 51.7124L0 29.7053H4.31543L8.28284 47.2207L12.9463 29.7053H17.3893L21.9251 47.2207L25.8926 29.7053H30.2428L24.2569 51.7124H19.4658L15.0924 35.401L10.5798 51.7124H5.82351Z\" fill=\"#273542\"/>\n<path d=\"M36.6578 36.6746H32.7716V51.7241H36.6578V36.6746Z\" fill=\"#273542\"/>\n<path d=\"M47.0754 52.0829C45.7413 52.0829 44.5581 51.863 43.5488 51.4346C42.5395 50.9947 41.7275 50.3928 41.1127 49.6287C40.5094 48.8646 40.1382 47.9733 40.0222 46.9545H43.9432C44.0592 47.5449 44.3956 48.0427 44.9293 48.4595C45.4629 48.8762 46.1589 49.0846 47.0174 49.0846C47.8642 49.0846 48.4907 48.911 48.8851 48.5637C49.2795 48.2164 49.4767 47.8228 49.4767 47.3828C49.4767 46.7346 49.1983 46.2946 48.6299 46.0631C48.0614 45.8316 47.2726 45.6001 46.2633 45.3801C45.6137 45.2412 44.9525 45.0675 44.2912 44.8591C43.6184 44.6623 43.0036 44.3961 42.4467 44.0835C41.8899 43.7709 41.4375 43.3658 41.0895 42.868C40.7415 42.3702 40.5674 41.7566 40.5674 41.0273C40.5674 39.696 41.1011 38.5731 42.1683 37.6585C43.2356 36.744 44.7321 36.2925 46.6578 36.2925C48.4443 36.2925 49.8595 36.7092 50.9268 37.5312C51.9941 38.3647 52.6205 39.4992 52.8293 40.9578H49.1519C48.9315 39.8465 48.0846 39.2908 46.623 39.2908C45.8921 39.2908 45.3353 39.4297 44.9409 39.7191C44.5465 39.997 44.3492 40.3559 44.3492 40.7842C44.3492 41.2241 44.6393 41.583 45.2309 41.8492C45.8225 42.1155 46.5998 42.3586 47.5742 42.5786C48.6299 42.8217 49.5927 43.0879 50.4744 43.3773C51.356 43.6668 52.0637 44.1067 52.5857 44.6855C53.1077 45.2643 53.3745 46.0863 53.3745 47.1629C53.3977 48.089 53.1541 48.9341 52.6437 49.6866C52.1333 50.4391 51.4024 51.0179 50.4512 51.4462C49.4999 51.863 48.3747 52.0829 47.0754 52.0829Z\" fill=\"#273542\"/>\n<path d=\"M63.328 52.0831C61.8083 52.0831 60.4626 51.7589 59.2793 51.1106C58.1077 50.4624 57.1796 49.5478 56.5184 48.3786C55.8456 47.2093 55.5208 45.8549 55.5208 44.3152C55.5208 42.7524 55.8456 41.3747 56.5068 40.1592C57.168 38.9437 58.0729 38.006 59.2445 37.3229C60.4046 36.6399 61.7851 36.3042 63.3628 36.3042C64.8476 36.3042 66.1469 36.6283 67.2838 37.2766C68.4206 37.9249 69.3023 38.8047 69.9403 39.9277C70.5783 41.0506 70.9032 42.3009 70.9032 43.6785C70.9032 43.8984 70.9032 44.13 70.8916 44.3731C70.88 44.6162 70.8684 44.8709 70.8452 45.1371H59.3838C59.465 46.3064 59.871 47.2325 60.6134 47.8924C61.3559 48.5638 62.2491 48.8879 63.3048 48.8879C64.0936 48.8879 64.7548 48.7143 65.3001 48.3554C65.8337 47.9965 66.2397 47.5451 66.5065 46.9778H70.4623C70.1839 47.9271 69.7083 48.7953 69.0471 49.571C68.3858 50.3466 67.5738 50.9601 66.6109 51.4116C65.6249 51.8631 64.5344 52.0831 63.328 52.0831ZM63.3512 39.4646C62.3999 39.4646 61.5531 39.7309 60.8222 40.2634C60.0914 40.7959 59.6274 41.6178 59.4186 42.706H66.9358C66.8777 41.7105 66.5065 40.9233 65.8453 40.3444C65.1725 39.754 64.3488 39.4646 63.3512 39.4646Z\" fill=\"#273542\"/>\n<path d=\"M74.2667 51.7124V29.7053H83.118C85.4033 29.7053 87.155 30.2378 88.3615 31.2913C89.5679 32.3448 90.1712 33.7108 90.1712 35.3663C90.1712 36.7439 89.7999 37.8552 89.0575 38.6772C88.3151 39.5107 87.3986 40.0664 86.3314 40.3558C87.5958 40.6105 88.6283 41.2356 89.4519 42.2312C90.2756 43.2268 90.6816 44.3844 90.6816 45.7042C90.6816 47.4406 90.0551 48.8761 88.7907 50.0106C87.5262 51.1451 85.7397 51.7124 83.4312 51.7124H74.2667ZM78.3037 38.955H82.5264C83.6632 38.955 84.5333 38.6887 85.1365 38.1678C85.7397 37.6469 86.0529 36.8944 86.0529 35.9335C86.0529 35.0074 85.7513 34.2781 85.1597 33.7455C84.5565 33.213 83.6632 32.9468 82.4684 32.9468H78.3037V38.955ZM78.3037 48.4478H82.8048C83.9996 48.4478 84.9277 48.17 85.5889 47.6143C86.2501 47.0586 86.5866 46.283 86.5866 45.2758C86.5866 44.2455 86.2385 43.4467 85.5425 42.8563C84.8465 42.2659 83.9184 41.9765 82.7352 41.9765H78.3037V48.4478Z\" fill=\"#F7971E\"/>\n<path d=\"M101.146 52.083C99.6843 52.083 98.3734 51.7472 97.2134 51.0874C96.0533 50.4159 95.1253 49.4898 94.4524 48.309C93.768 47.1282 93.4316 45.7506 93.4316 44.1993C93.4316 42.6365 93.7796 41.2704 94.464 40.0896C95.1485 38.9088 96.0765 37.9827 97.2482 37.3113C98.4082 36.6398 99.7307 36.3157 101.181 36.3157C102.619 36.3157 103.919 36.6514 105.09 37.3113C106.25 37.9827 107.178 38.9088 107.851 40.0896C108.536 41.2704 108.872 42.6481 108.872 44.1993C108.872 45.7622 108.536 47.1282 107.851 48.309C107.167 49.4898 106.25 50.4159 105.067 51.0874C103.895 51.7472 102.584 52.083 101.146 52.083ZM101.146 48.7142C102.155 48.7142 103.037 48.3322 103.791 47.5797C104.545 46.8156 104.916 45.6927 104.916 44.1993C104.916 42.7059 104.545 41.5714 103.791 40.819C103.037 40.0549 102.167 39.6845 101.181 39.6845C100.148 39.6845 99.2551 40.0665 98.5242 40.819C97.7818 41.583 97.4106 42.7059 97.4106 44.1993C97.4106 45.6927 97.7818 46.8272 98.5242 47.5797C99.2551 48.3322 100.137 48.7142 101.146 48.7142Z\" fill=\"#F7971E\"/>\n<path d=\"M121.818 52.0829C119.695 52.0829 117.827 51.6199 116.238 50.6822C114.648 49.7561 113.396 48.4595 112.502 46.8156C111.598 45.1717 111.145 43.2616 111.145 41.0968C111.145 38.9319 111.598 37.0218 112.502 35.3779C113.407 33.7341 114.648 32.4375 116.238 31.5114C117.827 30.5852 119.683 30.1106 121.818 30.1106C123.929 30.1106 125.785 30.5737 127.386 31.5114C128.987 32.4375 130.228 33.7341 131.121 35.3779C132.015 37.0218 132.455 38.9319 132.455 41.0968C132.455 43.1227 132.061 44.9286 131.272 46.5146C130.483 48.1006 129.393 49.3624 127.989 50.2886L132.919 55.5675H128.082L124.741 51.7472C123.801 51.9672 122.827 52.0829 121.818 52.0829ZM121.818 48.5868C123.848 48.5868 125.46 47.9154 126.667 46.5841C127.873 45.2528 128.476 43.4237 128.476 41.0968C128.476 38.7699 127.873 36.9408 126.667 35.6095C125.46 34.2782 123.848 33.6067 121.818 33.6067C119.788 33.6067 118.175 34.2782 116.957 35.6095C115.739 36.9408 115.136 38.7699 115.136 41.0968C115.136 43.4237 115.739 45.2528 116.957 46.5841C118.175 47.927 119.788 48.5868 121.818 48.5868Z\" fill=\"#F7971E\"/>\n<path d=\"M139.254 53.7501V21.6482L117.886 9.33072L95.5893 22.1807L93.7332 18.974L114.173 7.18906L108.605 3.98234L77.9447 21.6482V25.9315H74.2325V19.5065L108.095 0H109.116L117.886 5.05897L126.656 0H127.677L161.527 19.5065V53.7153L139.254 53.7501ZM121.598 7.18906L142.966 19.5065V50.034L157.827 50.0108V21.6482L127.178 3.98234L121.598 7.18906Z\" fill=\"#F7971E\"/>\n<path d=\"M36.6462 35.2623L32.7716 36.6399V32.7618L36.6462 31.3958V35.2623Z\" fill=\"#F7971E\"/>\n</svg>\n"}, onClick=this.onHTMLClick_897d09bb.bind(this), internal-fsb-guid="897d09bb")
            .col-4.col-md-9.internal-fsb-element(style={'paddingLeft': '0px', 'paddingRight': '0px', 'paddingTop': '40px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Navigation", internal-fsb-guid="e5c9d0ca")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  .col-12.internal-fsb-element(style={'MsFlexDirection': 'row', 'WebkitAlignItems': 'center', 'WebkitFlexDirection': 'row', 'WebkitJustifyContent': 'space-between', 'alignItems': 'center', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'paddingLeft': '0px', 'paddingRight': '0px'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Flex Container", internal-fsb-guid="9cad2396")
                    .d-block.d-lg-block.d-md-block.d-sm-block.d-xl-none.internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="Flex Span", internal-fsb-guid="dc271ba2")
                    a.-fsb-preset-ac0bee2c.-fsb-self-ab6b40a6.btn.d-lg-block.d-md-none.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'FsbInheritedPresets': 'ac0bee2c', 'FsbReusableId': 'ab6b40a6', 'FsbReusableName': '', 'color': (()=>{return (this.getMenuIndex() == 0) ? '#F7971E' : '';})() || 'rgba(11, 75, 136, 1)', fontWeight: (()=>{return (this.getMenuIndex() == 0) ? 600 : '';})()}, href="/", internal-fsb-event-no-propagate="1", internal-fsb-name="Home", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 0) ? '#F7971E' : '';]", internal-fsb-react-style-font-weight="CODE[return (this.getMenuIndex() == 0) ? 600 : '';]", internal-fsb-guid="ab6b40a6")
                      .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="ab6b40a6-text")
                        | หน้าแรก
                    a.-fsb-preset-ac0bee2c.btn.d-lg-block.d-md-block.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'FsbInheritedPresets': 'ac0bee2c', 'color': (()=>{return (this.getMenuIndex() == 1) ? '#F7971E' : '';})() || 'rgba(11, 75, 136, 1)', fontWeight: (()=>{return (this.getMenuIndex() == 1) ? 600 : '';})()}, href="/buyer", internal-fsb-event-no-propagate="1", internal-fsb-name="Buyer", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 1) ? '#F7971E' : '';]", internal-fsb-react-style-font-weight="CODE[return (this.getMenuIndex() == 1) ? 600 : '';]", internal-fsb-guid="1ca59eee")
                      .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="1ca59eee-text")
                        | สำหรับผู้ซื้อ
                    a.-fsb-preset-ac0bee2c.btn.d-lg-block.d-md-block.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'FsbInheritedPresets': 'ac0bee2c', 'color': (()=>{return (this.getMenuIndex() == 2) ? '#F7971E' : '';})() || 'rgba(11, 75, 136, 1)', fontWeight: (()=>{return (this.getMenuIndex() == 2) ? 600 : '';})()}, href="/bidder", internal-fsb-event-no-propagate="1", internal-fsb-name="Bidder", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 2) ? '#F7971E' : '';]", internal-fsb-react-style-font-weight="CODE[return (this.getMenuIndex() == 2) ? 600 : '';]", internal-fsb-guid="93cb7255")
                      .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="93cb7255-text")
                        | สำหรับร้านค้า
                    a.-fsb-preset-ac0bee2c.btn.d-lg-block.d-md-none.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'FsbInheritedPresets': 'ac0bee2c', 'color': (()=>{return (this.getMenuIndex() == 3) ? '#F7971E' : '';})() || 'rgba(11, 75, 136, 1)', fontWeight: (()=>{return (this.getMenuIndex() == 3) ? 600 : '';})()}, href="/blog/all", internal-fsb-event-no-propagate="1", internal-fsb-name="Blog", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 3) ? '#F7971E' : '';]", internal-fsb-react-style-font-weight="CODE[return (this.getMenuIndex() == 3) ? 600 : '';]", internal-fsb-guid="3c9939ee")
                      .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="3c9939ee-text")
                        | บทความ
                    a.-fsb-preset-ac0bee2c.btn.d-lg-block.d-md-block.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'FsbInheritedPresets': 'ac0bee2c', 'color': (()=>{return (this.getMenuIndex() == 4) ? '#F7971E' : '';})() || 'rgba(11, 75, 136, 1)', fontWeight: (()=>{return (this.getMenuIndex() == 4) ? 600 : '';})()}, href="/buyer/auction/new", internal-fsb-event-no-propagate="1", internal-fsb-name="Order", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 4) ? '#F7971E' : '';]", internal-fsb-react-style-font-weight="CODE[return (this.getMenuIndex() == 4) ? 600 : '';]", internal-fsb-guid="c290638d")
                      .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="c290638d-text")
                        | เพิ่มสินค้าในรถเข็น
                    a.-fsb-preset-ac0bee2c.btn.d-lg-block.d-md-block.d-none.d-sm-none.d-xl-block.internal-fsb-element(style={'FsbInheritedPresets': 'ac0bee2c', 'color': (()=>{return (this.getMenuIndex() == 5) ? '#F7971E' : '';})() || 'rgba(11, 75, 136, 1)', fontWeight: (()=>{return (this.getMenuIndex() == 5) ? 600 : '';})()}, href="/buyer/auction", internal-fsb-event-no-propagate="1", internal-fsb-name="Follow", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 5) ? '#F7971E' : '';]", internal-fsb-react-style-font-weight="CODE[return (this.getMenuIndex() == 5) ? 600 : '';]", internal-fsb-guid="e20c670a")
                      .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="e20c670a-text")
                        | ติดตามรายการ
                    a.btn.internal-fsb-element(style={'FsbInheritedPresets': '', 'background': 'rgba(11, 75, 136, 1)', 'color': 'rgba(255, 255, 255, 1)', 'paddingBottom': '8px', 'paddingLeft': '10px', 'paddingRight': '10px', 'paddingTop': '8px', 'whiteSpace': 'nowrap'}, href=window.loggingIn ? '/authentication/logout' : '/authentication', internal-fsb-event-no-propagate="1", internal-fsb-name="Login", internal-fsb-guid="554c3d2a")
                      .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="554c3d2a-text")
                        | #{this.state.loginText}
            .col-12.internal-fsb-element(style={'display': (()=>{return (this.state.isDisplayingMenu) ? 'block' : 'none';})() || 'none', 'paddingLeft': '0px', 'paddingRight': '0px', 'position': 'relative', 'zIndex': '10000'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Relative Container", internal-fsb-react-style-display="CODE[return (this.state.isDisplayingMenu) ? 'block' : 'none';]", internal-fsb-guid="1971b510")
              .container-fluid(internal-fsb-event-no-propagate="1")
                .internal-fsb-strict-layout.row
                  .col-12.internal-fsb-element(style={'WebkitBorderRadius': '4px 4px 4px 4px', 'background': 'rgba(11, 75, 136, 1)', 'borderRadius': '4px 4px 4px 4px', 'paddingBottom': '15px', 'paddingTop': '15px', 'position': 'absolute'}, internal-fsb-event-no-propagate="1", internal-fsb-name="Menu Container", internal-fsb-guid="e10b48b1")
                    .container-fluid(internal-fsb-event-no-propagate="1")
                      .internal-fsb-strict-layout.row
                        a.-fsb-self-b6c5b151.btn.col-12.internal-fsb-element(style={color: (()=>{return (this.getMenuIndex() == 0) ? '#F7971E' : '';})()}, href="/", internal-fsb-event-no-propagate="1", internal-fsb-name="Home", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 0) ? '#F7971E' : '';]", internal-fsb-reusable-preset-name="v2_menu_item_white", internal-fsb-guid="b6c5b151")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="b6c5b151-text")
                            | หน้าแรก
                        a.-fsb-preset-b6c5b151.btn.col-12.internal-fsb-element(style={'FsbInheritedPresets': 'b6c5b151', color: (()=>{return (this.getMenuIndex() == 1) ? '#F7971E' : '';})()}, href="/buyer", internal-fsb-event-no-propagate="1", internal-fsb-name="Buyer", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 1) ? '#F7971E' : '';]", internal-fsb-guid="e9b18619")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="e9b18619-text")
                            | สำหรับผู้ซื้อ
                        a.-fsb-preset-b6c5b151.btn.col-12.internal-fsb-element(style={'FsbInheritedPresets': 'b6c5b151', color: (()=>{return (this.getMenuIndex() == 2) ? '#F7971E' : '';})()}, href="/bidder", internal-fsb-event-no-propagate="1", internal-fsb-name="Bidder", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 2) ? '#F7971E' : '';]", internal-fsb-guid="70ed9171")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="70ed9171-text")
                            | สำหรับร้านค้า
                        a.-fsb-preset-b6c5b151.btn.col-12.internal-fsb-element(style={'FsbInheritedPresets': 'b6c5b151', color: (()=>{return (this.getMenuIndex() == 4) ? '#F7971E' : '';})()}, href="/buyer/auction/new", internal-fsb-event-no-propagate="1", internal-fsb-name="Order", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 4) ? '#F7971E' : '';]", internal-fsb-guid="e723adee")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="e723adee-text")
                            | เพิ่มสินค้าในรถเข็น
                        a.-fsb-preset-b6c5b151.btn.col-12.internal-fsb-element(style={'FsbInheritedPresets': 'b6c5b151', color: (()=>{return (this.getMenuIndex() == 3) ? '#F7971E' : '';})()}, href="/blog/all", internal-fsb-event-no-propagate="1", internal-fsb-name="Blog", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 3) ? '#F7971E' : '';]", internal-fsb-guid="96d02ee2")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="96d02ee2-text")
                            | บทความ
                        a.-fsb-preset-b6c5b151.btn.col-12.internal-fsb-element(style={'FsbInheritedPresets': 'b6c5b151', color: (()=>{return (this.getMenuIndex() == 5) ? '#F7971E' : '';})()}, href="/buyer/auction", internal-fsb-event-no-propagate="1", internal-fsb-name="Follow", internal-fsb-react-style-color="CODE[return (this.getMenuIndex() == 5) ? '#F7971E' : '';]", internal-fsb-guid="b0bb47ac")
                          .internal-fsb-element(internal-fsb-event-no-propagate="1", internal-fsb-name="TextElement", internal-fsb-guid="b0bb47ac-text")
                            | ติดตามรายการ
    `
  }
}
DeclarationHelper.declare('Site', 'Controls.FlowLayout_44724940', FlowLayout_44724940);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState};



// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.