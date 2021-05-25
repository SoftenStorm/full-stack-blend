import {CodeHelper} from '../../../helpers/CodeHelper';
import {HTMLHelper} from '../../../helpers/HTMLHelper';
import {IProps, IState, DefaultProps, DefaultState, Base} from '../Base';
import {DeclarationHelper} from '../../../helpers/DeclarationHelper';

declare const GITHUB_TOKEN: any;
declare const GITHUB_ALIAS: any;
declare const GITHUB_PROJECT: any;
declare const GITHUB_FEATURE_BRANCH: any;
declare const GITHUB_DEVELOP_BRANCH: any;
declare const GITHUB_STAGING_BRANCH: any;

interface Props extends IProps {
}

interface State extends IState {
		loading: boolean;
		openning: boolean;
}

let ExtendedDefaultProps = Object.assign({}, DefaultProps);
Object.assign(ExtendedDefaultProps, {
});

let ExtendedDefaultState = Object.assign({}, DefaultState);
Object.assign(ExtendedDefaultState, {
    loading: false,
    openning: false
});

class MergeManager extends Base<Props, State> {
    protected state: State = {};
    protected static defaultProps: Props = ExtendedDefaultProps;

    constructor(props) {
      super(props);
      Object.assign(this.state, CodeHelper.clone(ExtendedDefaultState));
    }
    
    componentDidMount() {
    }
    
    public update(properties: any) {
      if (!super.update(properties)) return;
    }
    
    public solveConflicts(featureBranch, destinationBranch) {
    	return new Promise((resolve, reject) => {
    		this.setState({loading: true, openning: true});
    	});
    }
    
    private close(error) {
        if (error && error.message) console.error(error.message);
      	
        this.setState({loading: false, openning: false});
    		HTMLHelper.removeClass(document.body, 'internal-fsb-preview-on');
    }
    
    render() {
      return pug `
        .site-preview(style={display: (this.state.openning) ? 'block' : 'none'})
          .close-button.btn.btn-sm.btn-light.px-3(onClick=this.close.bind(this))
            i.fa.fa-close.m-0
          .iframe-container
            .iframe-body
              | ABC
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

DeclarationHelper.declare('Components.MergeManager', MergeManager);

export {Props, State, MergeManager};