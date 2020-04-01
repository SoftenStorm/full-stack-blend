import {HTMLHelper} from '../../helpers/HTMLHelper.js';
import {EventHelper} from '../../helpers/EventHelper.js';
import {FullStackBlend, DeclarationHelper} from '../../../helpers/DeclarationHelper.js';

declare let React: any;
declare let ReactDOM: any;

interface Props extends IProps {
    options: [any];
    controls: [any];
    identity: any;
    onUpdate(identity: any, value: any, index: any);
    autohide: boolean;
    customClassName: string;
    dropDownWidth: number;
}

interface State extends IState {
}

class DropDownList extends React.Component<Props, State> {
    static defaultProps: Props = {
        options: [],
        controls: [],
        autohide: true,
        dropDownWidth: null
    }
    
    private documentOnClickDelegate: Function = null;
    
    constructor() {
        super();
        
        this.documentOnClickDelegate = this.documentOnClick.bind(this);
    }
    
    componentDidMount() {
        let $this = this;
        let button = ReactDOM.findDOMNode(this.refs.button);
        let dropdown = ReactDOM.findDOMNode(this.refs.dropdown);
        
        button.addEventListener('click', (event) => {
            if (this.props.autohide) {
                window.document.body.click();
            }
            
            let position = HTMLHelper.getPosition(button);
            let size = HTMLHelper.getSize(button);
            let dropDownWidth = (this.props.dropDownWidth != null) ? this.props.dropDownWidth : size[0];
            let dropDownMinWidth = (this.props.dropDownMinWidth != null) ? this.props.dropDownMinWidth : 0;
            let windowWidth = window.innerWidth;
            
            dropdown.style.position = 'fixed';
            if (position[0] + Math.max(dropDownMinWidth, dropDownWidth) < windowWidth) {
                dropdown.style.left = (position[0]) + 'px';
            } else {
                dropdown.style.left = (windowWidth - Math.max(dropDownMinWidth, dropDownWidth)) + 'px';
            }
            dropdown.style.top = (position[1] + size[1]) + 'px';
            dropdown.style.width = dropDownWidth + 'px';
            dropdown.style.minWidth = dropDownMinWidth + 'px';
            dropdown.style.maxHeight = (window.innerHeight - position[1] - size[1] - 5) + 'px';
            
            dropdown.className = 'fsb-dropdown-menu dropdown-menu show';
            window.document.body.appendChild(dropdown);
            
            window.document.body.addEventListener('click', this.documentOnClickDelegate, false);
            
            return EventHelper.cancel(event);
        });
    }
    
    componentWillUnmount() {
        window.document.body.removeEventListener('click', this.documentOnClickDelegate, false);
    }
    
    private documentOnClick(event) {
        if (EventHelper.checkIfDenyForHandle(event)) return;
        
        this.hide();
    }
    
    public hide() {
        let group = ReactDOM.findDOMNode(this.refs.group);
        let dropdown = ReactDOM.findDOMNode(this.refs.dropdown);
        
        dropdown.style.position = '';
        dropdown.style.left = '';
        dropdown.style.top = '';
        dropdown.style.width = '';
        dropdown.style.maxHeight = '';
        
        dropdown.className = 'fsb-dropdown-menu dropdown-menu';
        group.appendChild(dropdown);
        
        window.document.body.removeEventListener('click', this.documentOnClickDelegate, false);
    }
    
    private dropdownItemOnClick(event) {
        if (this.props.onUpdate) {
            this.props.onUpdate(this.props.identity, EventHelper.getCurrentElement(event).getAttribute('value'), EventHelper.getCurrentElement(event).getAttribute('index'));
        }
        
        this.hide();
        
        return EventHelper.cancel(event);
    }
    
    render() {
      return (
        pug `
          .btn-group(ref="group", internal-fsb-event-no-propagate="click")
            button.btn.btn-sm.dropdown-toggle(ref="button", type="button", className=(this.props.customClassName || "btn-light"), aria-haspopup="true", aria-expanded="false")
              = this.props.children
            .fsb-dropdown-menu.dropdown-menu(ref="dropdown", internal-fsb-event-no-propagate="click")
              each value, index in this.props.options
                .dropdown-item(key="item-" + value, value=value index=index onClick=this.dropdownItemOnClick.bind(this) internal-fsb-event-no-propagate="click")
                  if typeof value === 'string' && value[0] === '{' && value[value.length - 1] === '}'
                    = this.props.controls[value]
                  else
                    span(dangerouslySetInnerHTML={__html: value || "none"})
        `
      )
    }
}

DeclarationHelper.declare('Controls.DropDownList', DropDownList);

export {Props, State, DropDownList};