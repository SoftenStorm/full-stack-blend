import {EventHelper} from '../../helpers/EventHelper.js';
import {FullStackBlend, DeclarationHelper} from '../../../helpers/DeclarationHelper.js';

declare let React: any;
declare let ReactDOM: any;

interface Props extends IProps {
    preRegEx: String;
    postRegEx: String;
    onUpdate(value: any);
}

interface State extends IState {
}

class Textbox extends React.Component<Props, State> {
    static defaultProps: Props = {
    }
    
    private previousValue: String = "";
    private previousPreRegExp: String = "";
    private preRegExp: RegExp = null;
    private previousPostRegExp: String = "";
    private postRegExp: RegExp = null;
    
    constructor() {
        super();
    }
    
    componentDidMount() {
        let input = ReactDOM.findDOMNode(this.refs.input);
        input.addEventListener('click', (event) => {
            return EventHelper.cancel(event);
        });
    }
    
    componentDidUpdate(prevProps) {
        let input = ReactDOM.findDOMNode(this.refs.input);
        if (this.props.value != input.value) {
            input.value = this.props.value || '';
        }
    }
    
    inputOnKeyUp(event) {
        if (this.props.preRegExp) {
            if (this.previousPreRegExp != this.props.preRegExp) {
                this.preRegExp = new RegExp('^' + this.props.preRegExp + '$', 'i');
                this.previousPreRegExp = this.props.preRegExp;
            }
            
            let input = ReactDOM.findDOMNode(this.refs.input);
            let completingValue = input.value;
            
            if (completingValue.match(this.preRegExp)) {
                this.previousValue = completingValue;
            } else {
                input.value = this.previousValue;
            }
        }
        
        if (this.props.postRegExp) {
            if (this.previousPostRegExp != this.props.postRegExp) {
                this.postRegExp = new RegExp('^' + this.props.postRegExp + '$', 'i');
                this.previousPostRegExp = this.props.postRegExp;
            }
            
            let input = ReactDOM.findDOMNode(this.refs.input);
            let completingValue = input.value;
            
            if (completingValue.match(this.postRegExp)) {
                if (this.props.onUpdate) {
                    this.props.onUpdate(completingValue);
                }
            } else {
                if (this.props.onUpdate) {
                    this.props.onUpdate(null);
                }
            }
        }
    }
    
    render() {
      return (
        pug `
          input.form-control.form-control-sm(ref="input", type="text", onKeyUp=this.inputOnKeyUp)
        `
      )
    }
}

DeclarationHelper.declare('Controls.Textbox', Textbox);

export {Props, State, Textbox};