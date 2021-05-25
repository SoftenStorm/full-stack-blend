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
class Image_81a668ca extends Base {
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
  	
  	const image = ReactDOM.findDOMNode(this.refs.image);
  	const actualUrl = image.src;
  	
  	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=';
  	
  	window.setTimeout(() => {
  	  image.src = actualUrl;
  	}, 1000);
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
      div(style=Object.assign({padding: '0px'}, this.props.forward && this.props.forward.styles || {}), className="col-12 col-md-10 d-block d-lg-none d-md-none d-sm-block d-xl-none internal-fsb-element offset-md-1 " + (this.props.forward && this.props.forward.classes || ''), internal-fsb-guid="81a668ca")
        img(style={'WebkitBackgroundSize': 'contain', 'backgroundImage': 'url(https://static.wiseboq.com/homepage/role/buyer.png)', 'backgroundRepeat': 'no-repeat', 'backgroundSize': 'contain', 'width': '100%'}, ref="image", internal-fsb-event-no-propagate="1", internal-fsb-name="Figure", internal-fsb-react-code-body="
  
  // Declare class variables and functions here:
  //
  protected initialize(): void {
  }
  
  protected componentDidMount(): void {
  	this.register();
  	
  	const image = ReactDOM.findDOMNode(this.refs.image);
  	const actualUrl = image.src;
  	
  	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=';
  	
  	window.setTimeout(() => {
  	  image.src = actualUrl;
  	}, 1000);
  }
  
  protected componentWillUnmount(): void {
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string, inArray: boolean=false): any {
    return super.getDataFromNotation(notation, inArray);
  }
  
  ", internal-fsb-react-code-interface="

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

", src="https://static.wiseboq.com/homepage/role/buyer.png")
    `
  }
}
DeclarationHelper.declare('Document', 'Controls.Image_81a668ca', Image_81a668ca);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState};



// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.