import {HTMLHelper} from '../../helpers/HTMLHelper.js';
import {TransformControls, TransformControlsGizmo, TransformControlsPlane} from '../lib/TransformControls.js';
import {WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, BoxBufferGeometry, LineBasicMaterial, WireframeGeometry, LineSegments} from '../lib/three.module.js';
import {CSS3DObject, CSS3DSprite, CSS3DRenderer} from '../lib/CSS3DRenderer.js';
import {IProps, IState, Base} from './Base.js';
import {FullStackBlend, DeclarationHelper} from '../../../helpers/DeclarationHelper.js';

declare let React: any;
declare let ReactDOM: any;
declare let perform: any;
declare let THREE: any;

interface Props extends IProps {
}

interface State extends IState {
    mode: string
}

class Transformer extends Base<Props, State> {
    state: IState = {classNameStatuses: {}, styleValues: {}, properties: {}, mode: 'rotate'}
    static defaultProps: Props = {
      watchingClassNames: [],
      watchingStyleNames: ['transform']
    }
    
    private webGLCamera: any;
    private webGLScene: any;
    private webGLRenderer: any;
    private webGLControl: any;
    private webGLMesh: any;
    
    private css3DCamera: any;
    private css3DScene: any;
    private css3DRenderer: any;
    private css3DElement: any;
    
    private previousTransform: string = null;
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.init();
        this.render3D();
    }
    
    init() {        
        // WebGL Renderer
        //
        let container = ReactDOM.findDOMNode(this.refs.container);
    
        this.webGLRenderer = new WebGLRenderer({alpha: true});
        this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
        this.webGLRenderer.setSize(238, 210);
        this.webGLRenderer.setClearColor(0x000000, 0);
        container.appendChild(this.webGLRenderer.domElement);
        
        this.webGLCamera = new PerspectiveCamera(50, 238.0 / 210.0, 1, 3000);
        this.webGLCamera.position.set(100, 100, 100);
        this.webGLCamera.lookAt(0, 0, 0);
        
        this.webGLScene = new Scene();
        this.webGLScene.add(this.webGLCamera);
        
        var geometry = new BoxBufferGeometry(25, 25, 25);
        var wireframe = new WireframeGeometry(geometry);
        
        this.webGLMesh = new LineSegments(wireframe);
        this.webGLMesh.material.color.setHex(0x555555);
        this.webGLMesh.material.depthTest = false;
        this.webGLMesh.material.opacity = 0.25;
        this.webGLMesh.material.transparent = true;
        
        this.webGLScene.add(this.webGLMesh);
        
        // CSS3D Renderer
        //
        this.css3DRenderer = new CSS3DRenderer();
        this.css3DRenderer.setSize(238, 210);
        
        this.css3DCamera = new PerspectiveCamera(50, 238.0 / 210.0, 1, 3000);
        this.css3DCamera.position.set(0, 0, 100);
        this.css3DCamera.lookAt(0, 0, 0);
        
        this.css3DElement = new CSS3DObject(ReactDOM.findDOMNode(this.refs.output));
        this.css3DElement.position.set(0, 0, 0);
        
        this.css3DScene = new Scene();
        this.css3DScene.add(this.css3DElement);
        this.css3DScene.add(this.css3DCamera);
        
        // Transformer Control
        //
        this.webGLControl = new TransformControls(this.webGLCamera, this.webGLRenderer.domElement);
        
        this.webGLControl.attach(this.webGLMesh);
        this.webGLControl.setMode(this.state.mode);
        this.webGLControl.addEventListener('change', this.render3D.bind(this));
        
        this.webGLScene.add(this.webGLControl);
	}
    
    optionOnClick(mode) {
        if (mode == 'reset') {
            this.webGLMesh.position.set(0, 0, 0);
            this.webGLMesh.rotation.set(0, 0, 0);
            this.webGLMesh.scale.set(1, 1, 1);
            
            this.render3D();
        } else {
            this.setState({
                mode: mode
            });
            
            this.webGLControl.setMode(mode);
        }
    }
    
    render3D() {
        this.css3DElement.position.set(this.webGLMesh.position.x, -this.webGLMesh.position.y, this.webGLMesh.position.z);
        this.css3DElement.rotation.copy(this.webGLMesh.rotation);
        this.css3DElement.scale.copy(this.webGLMesh.scale);
    
        this.webGLRenderer.render(this.webGLScene, this.webGLCamera);
        this.css3DRenderer.render(this.css3DScene, this.css3DCamera);
        
        let style = ReactDOM.findDOMNode(this.refs.output).getAttribute('style');
        let transform = HTMLHelper.getInlineStyle(style, 'transform');
        
        if (this.previousTransform != transform) {
            perform('update', {
                aStyle: {
                    name: 'transform',
                    value: transform
                },
                replace: 'transform'
            });
            this.previousTransform = transform;
        }
    }
    
    render() {
      return (
        pug `
          div
            div(ref="output", style={display: 'none'})
            div(ref="container", style={border: 'dashed 1px #999999'})
            div.text-center.mt-1
              .badge.badge-pill.mr-1(onClick=this.optionOnClick.bind(this, 'translate'), className=(this.state.mode == 'translate') ? 'badge-primary cursor-default' : 'badge-secondary cursor-pointer')
                | Move
              .badge.badge-pill.mr-1(onClick=this.optionOnClick.bind(this, 'rotate'), className=(this.state.mode == 'rotate') ? 'badge-primary cursor-default' : 'badge-secondary cursor-pointer')
                | Rotate
              .badge.badge-pill.mr-1(onClick=this.optionOnClick.bind(this, 'scale'), className=(this.state.mode == 'scale') ? 'badge-primary cursor-default' : 'badge-secondary cursor-pointer')
                | Scale
              .badge.badge-pill.badge-secondary.cursor-pointer(onClick=this.optionOnClick.bind(this, 'reset'))
                | Reset
        `
      )
    }
}

DeclarationHelper.declare('Components.Transformer', Transformer);

export {Props, State, Transformer};