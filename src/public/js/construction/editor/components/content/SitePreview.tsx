import {CodeHelper} from '../../../helpers/CodeHelper';
import {HTMLHelper} from '../../../helpers/HTMLHelper';
import {RequestHelper} from '../../../helpers/RequestHelper';
import {IProps, IState, DefaultProps, DefaultState, Base} from '../Base';
import {FullStackBlend, DeclarationHelper} from '../../../helpers/DeclarationHelper';
import {LIBRARIES, DEBUG_SITE_PREVIEW} from '../../../Constants';

declare let React: any;
declare let ReactDOM: any;

interface Props extends IProps {
}

interface State extends IState {
   loading: boolean;
   location: string;
}

let ExtendedDefaultProps = Object.assign({}, DefaultProps);
Object.assign(ExtendedDefaultProps, {
    watchingExtensionNames: ["editingPageID", "pages"]
});

let ExtendedDefaultState = Object.assign({}, DefaultState);
Object.assign(ExtendedDefaultState, {
    loading: false,
    location: null
});

class SitePreview extends Base<Props, State> {
		protected state: State = {};
    protected static defaultProps: Props = ExtendedDefaultProps;

    constructor(props) {
        super(props);
        Object.assign(this.state, CodeHelper.clone(ExtendedDefaultState));
    }
    
    public update(properties: any) {
        if (!super.update(properties)) return;
    }
    
    public open() {
        this.setState({loading: true, location: 'about:blank'});
        HTMLHelper.addClass(document.body, 'internal-fsb-preview-on');
    }
    
    public start(display: boolean=true) {
    		this.setState({loading: true});
        HTMLHelper.addClass(document.body, 'internal-fsb-preview-on');
    		
    		let preview = ReactDOM.findDOMNode(this.refs.preview);
    		let pages = this.state.extensionValues['pages'];
        let editingPageID = this.state.extensionValues['editingPageID'];
        
        pages = pages.filter(page => page.id == editingPageID);
        let PATH = pages && pages[0] && pages[0].path || null;
       	
       	RequestHelper.get(`${ENDPOINT}${PATH}`).then((() => {
       		this.setState({location: `${ENDPOINT}${PATH}`});
       	}).bind(this));
    }
    
    public load() {
    		if (this.state.location == 'about:blank') return;
        this.setState({loading: false});
    }
    
    private close(error) {
        if (error && error.message) console.error(error.message);
      	
        this.setState({loading: false, location: 'about:blank'});
    		HTMLHelper.removeClass(document.body, 'internal-fsb-preview-on');
    }
    
    public isOpening() {
    		return this.state.loading;
    }
    
    render() {
      let endpoint = (<FullStackBlend.Components.EndpointManager ref="endpoint"></FullStackBlend.Components.EndpointManager>);
      return pug `
        .site-preview
          .close-button.btn.btn-sm.btn-light.px-3(onClick=this.close.bind(this))
            i.fa.fa-close.m-0
          .iframe-container
            .iframe-navigation-bar
            .iframe-body
              iframe(ref="preview", onLoad=this.load.bind(this), src=this.state.location)
          .loading-container(style={display: this.state.loading ? 'block' : 'none'})
            .linear-background
              .inter-left
              .inter-right--top
              .inter-right--bottom
            .linear-background
              .inter-left
              .inter-right--top
              .inter-right--bottom
            .linear-background
              .inter-left
              .inter-right--top
              .inter-right--bottom
        `
    }
}

DeclarationHelper.declare('Components.SitePreview', SitePreview);

export {Props, State, SitePreview};