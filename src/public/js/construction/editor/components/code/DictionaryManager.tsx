import {CodeHelper} from '../../../helpers/CodeHelper.js';
import {IProps, IState, DefaultState, DefaultProps, Base} from '../Base.js';
import {FullStackBlend, DeclarationHelper} from '../../../helpers/DeclarationHelper.js';
import '../generic/ListManager.js';

declare let React: any;
declare let ReactDOM: any;
declare let perform: any;

interface Props extends IProps {
}

interface State extends IState {
}

let ExtendedDefaultState = Object.assign({}, DefaultState);
Object.assign(ExtendedDefaultState, {
});

let ExtendedDefaultProps = Object.assign({}, DefaultProps);
Object.assign(ExtendedDefaultProps, {
});

class DictionaryManager extends Base<Props, State> {
    private onUpdate(node: ITreeNode) {
        
    }
    
    private onDragged(element: ITreeNode, reference: ITreeNode, direction: InsertDirection) {
    		
    }
    
    private onInsertOptionVisibleChanged(value: boolean) {
        
    }
    
    private onUpdateOptionVisibleChanged(value: boolean, node: ITreeNode) {
        
    }
    
    render() {
        return (
            <FullStackBlend.Components.ListManager onUpdate={this.onUpdate.bind(this)} onDragged={this.onDragged.bind(this)} onInsertOptionVisibleChanged={this.onInsertOptionVisibleChanged.bind(this)} onUpdateOptionVisibleChanged={this.onUpdateOptionVisibleChanged.bind(this)}>
                <div className="section-container" style={{width: '175px'}}>
                    <div className="section-title">Customize Key & Value</div>
                    <div className="section-subtitle">Binding</div>
                    <div className="section-body"></div>
                    <div className="section-subtitle">No Propagation</div>
                    <div className="section-body"></div>
                </div>
            </FullStackBlend.Components.ListManager>
        )
    }
}

DeclarationHelper.declare('Components.DictionaryManager', DictionaryManager);

export {DictionaryManager};