import {HTMLHelper} from '../../../helpers/HTMLHelper.js';
import {Accessories, EditorHelper} from './EditorHelper.js';

var LayoutHelper = {
  calculateColumnSize: function(width: number) {
    let selectingElement = EditorHelper.getSelectingElement();
    if (selectingElement) {
      let measure = document.createElement('div');
      let i: number;
      
      selectingElement.parentNode.insertBefore(measure, selectingElement.parentNode.firstChild);
      
      for (i=1; i<=12; i++) {
        measure.className = 'col-' + i;
        if (HTMLHelper.getSize(measure)[0] >= width) break;
      }

      selectingElement.parentNode.removeChild(measure);
      
      return Math.min(12, i);
    } else {
      return null;
    }
  },
  getElementTreeNodes: function(nodes: array=[], container: any=document.body) {
  	if (!container.childNodes) return;
  	
  	for (let element of container.childNodes) {
  		if (!element.getAttribute) continue;
  		
  		let name = HTMLHelper.getAttribute(element, 'internal-fsb-name');
  		let klass = HTMLHelper.getAttribute(element, 'internal-fsb-class');
  		let guid = HTMLHelper.getAttribute(element, 'internal-fsb-guid');
  		let isTheBeginElement = HTMLHelper.hasClass(element, 'internal-fsb-begin');
  		let isTableLayoutCell = (element.tagName == 'TD' && HTMLHelper.hasClass(element, 'internal-fsb-allow-cursor'));
  		let id = (isTableLayoutCell) ? HTMLHelper.getAttribute(element.parentNode.parentNode, 'internal-fsb-guid') : HTMLHelper.getAttribute(element, 'internal-fsb-guid');
  		
  		if ((id || isTableLayoutCell) && !isTheBeginElement) {
  			nodes.push({
  				id: (isTableLayoutCell) ? id + ':' + [...element.parentNode.parentNode.childNodes].indexOf(element.parentNode) +
  					',' + [...element.parentNode.childNodes].indexOf(element) : id,
  				name: (isTableLayoutCell) ? 'cell' : name,
  				selectable: !isTableLayoutCell,
  				dropable: isTableLayoutCell || ['FlowLayout', 'AbsoluteLayout', 'Rectangle', 'Button', 'Label'].indexOf(klass) != -1,
					disabled: false,
					selected: (Accessories.resizer.getDOMNode().parentNode == element) ? true : false,
  				nodes: this.getElementTreeNodes([], element),
  				tag: {
  				  class: klass,
  				  guid: guid,
  				  options: LayoutHelper.getElementOptions(element)
  				}
  			});
  		} else {
  			this.getElementTreeNodes(nodes, element);
  		}
  	}
  	return nodes;
  },
  getElementOptions: function(element: HTMLElement) {
    if (HTMLHelper.getAttribute(element, 'internal-fsb-class') == 'Select') {
      let children = HTMLHelper.getElementsByTagName('option', element.firstChild);
      return [...children].map((child) => {
        if (child.tagName)
  	    return {
  	      name: child.innerText,
  	      value: child.getAttribute('value'),
  	      selected: child.getAttribute('selected') == 'true'
  	    }
  	  });
  	} else {
  	  return null;
  	}
  }
};

export {LayoutHelper};