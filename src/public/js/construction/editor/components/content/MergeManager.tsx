import {CodeHelper} from '../../../helpers/CodeHelper';
import {HTMLHelper} from '../../../helpers/HTMLHelper';
import {RepositoryHelper} from '../../../helpers/RepositoryHelper';
import {IProps, IState, DefaultProps, DefaultState, Base} from '../Base';
import {DeclarationHelper} from '../../../helpers/DeclarationHelper';
import {DEBUG_GITHUB_UPLOADER} from '../../../Constants';

declare const GITHUB_TOKEN: any;
declare const GITHUB_ALIAS: any;
declare const GITHUB_PROJECT: any;
declare const GITHUB_FEATURE_BRANCH: any;
declare const GITHUB_DEVELOP_BRANCH: any;
declare const GITHUB_STAGING_BRANCH: any;

enum Merging {
  AlwaysReplace: 0,
  NewerAlwaysReplace: 1,
  NewerUniqueExistence: 2,
  UniqueTokenizeString: 4,
  UniqueTokenizeKeyValueString: 8,
  UniqueArray: 16,
  CombineDictionary: 32,
  CombineHTML: 64,
  CombineJavaScript: 128,
  ReplacementLeveling: 256
}
enum Strategy {
  DeleteOrKeep,
  Combine
}

const HierarchicalMergingStrategy = {
  children: Merging.AlwaysReplace,
  animations: {
    strategy: Merging.CombineDictionary | Merging.ReplacementLeveling,
    children: {
      strategy: Merging.CombineDictionary | Merging.NewerAlwaysReplace | Merging.ReplacementLeveling,
	    children: Merging.UniqueTokenizeKeyValueString
    }
  },
  backEndControllerBlobSHADict: Merging.CombineDictionary | Merging.AlwaysReplace,
  components: {
    strategy: Merging.CombineDictionary,
    children: {
      strategy: Merging.NewerAlwaysReplace | Merging.ReplacementLeveling,
      html: Merging.CombineHTML
    }
  },
  controllerBlobSHA: Merging.AlwaysReplace,
  currentPersistingFiles: Merging.UniqueArray,
  flows: {
    default: Merging.CombineHTML,
    schema: Merging.CombineDictionary | Merging.NewerAlwaysReplace
  },
  footerBlobSHA: Merging.AlwaysReplace,
  frontEndComponentsBlobSHADict: Merging.CombineDictionary | Merging.AlwaysReplace,
  globalSettings: {
    strategy: Merging.AlwaysReplace,
    colorSwatches: Merging.CombineDictionary | Merging.NewerAlwaysReplace | Merging.ReplacementLeveling,
    components: {
      strategy: Merging.CombineDictionary,
	    children: Merging.NewerAlwaysReplace
	  },
	  customExternalLibraries: Merging.UniqueTokenizeString,
	  externalLibraries: Merging.UniqueTokenizeString,
    pages: {
      strategy: Merging.CombineDictionary,
	    children: Merging.NewerAlwaysReplace
	  },
    popups: {
      strategy: Merging.CombineDictionary,
	    children: Merging.NewerAlwaysReplace
	  }
  },
  headerBlobSHA: Merging.AlwaysReplace,
  popups: {
    strategy: Merging.CombineDictionary,
    children: {
      strategy: Merging.NewerAlwaysReplace | Merging.ReplacementLeveling,
      html: Merging.CombineHTML
    }
  },
  routeBlobSHA: Merging.AlwaysReplace,
  services: {
    default: Merging.CombineHTML
  },
  siteBundleBlobSHA: Merging.AlwaysReplace,
  sites: {
    strategy: Merging.CombineDictionary,
    children: {
      strategy: Merging.NewerAlwaysReplace | Merging.ReplacementLeveling,
      html: Merging.CombineHTML
    }
  },
  stylesheets: {
    strategy: Merging.CombineDictionary | Merging.ReplacementLeveling
    children: strategy: Merging.UniqueTokenizeKeyValueString | Merging.ReplacementLeveling
  },
  viewBlobSHADict: Merging.CombineDictionary | Merging.AlwaysReplace
};
const HTMLMergingStrategy = {
  children: Merging.UniqueArray | Merging.NewerUniqueExistence,
  attributes: {
    strategy: Merging.CombineDictionary | Merging.NewerAlwaysReplace,
    class: Merging.UniqueTokenizeString,
    style: Merging.UniqueTokenizeKeyValueString | Merging.NewerAlwaysReplace,
    'internal-fsb-react-code': Merging.CombineJavaScript,
    'internal-fsb-inner-html': Merging.CombineHTML | Merging.NewerAlwaysReplace,
    innerHTML: Merging.NewerAlwaysReplace
  }
};

interface Props extends IProps {
}

interface State extends IState {
	loading: boolean;
	openning: boolean;
	differenceInfo: any;
}

let ExtendedDefaultProps = Object.assign({}, DefaultProps);
Object.assign(ExtendedDefaultProps, {
});

let ExtendedDefaultState = Object.assign({}, DefaultState);
Object.assign(ExtendedDefaultState, {
  loading: false,
  openning: false,
  differenceInfo: null
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
  
  private getValueFromKeys(data: any, keys: any[]) {
    let current = data;
    for (const key of keys) {
      if (current.hasOwnProperty(key)) {
        current = current[key];
      } else {
        current = undefined;
      }
      if (current === undefined) break;
    }
    return current;
  }
  
  private convertKeyValueStringIntoDictionary(keyValueString: string) {
    const splited = keyValueString.split(';');
    const dictionary = {};
    for (const keyValue of splited) {
      if (!keyValue.trim()) continue;
      const tokens = keyValue.split(':');
      dictionary[tokens[0].trim()] = tokens[1].trim();
    }
    return dictionary;
  }
  
  private convertDictionaryIntoKeyValueString(dictionary: any) {
    const keyValues = [];
    for (const key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
        keyValues.push(`${key}: ${dictionary[key]}`);
      }
    }
    return keyValues.join('; ');
  }
  
  private getMergeStrategy(previous: any, next: any, keys: any[], merging: Merging) {
    let previousValue = this.getValueFromKeys(previous, keys);
    let nextValue = this.getValueFromKeys(next, keys);
    let previousValueInJSON = JSON.stringify(previousValue);
    let nextValueInJSON = JSON.stringify(nextValue);
    let mergedValue = undefined;
    let strategy: Strategy;
    
    if (previousValueInJSON == nextValueInJSON) strategy = null;
    else if (previousValueInJSON != 'undefined' && nextValueInJSON == 'undefined') strategy = Strategy.DeleteOrKeep;
    else if (previousValueInJSON == 'undefined' && nextValueInJSON != 'undefined') strategy = Strategy.DeleteOrKeep;
    else {
      strategy = Strategy.Combine;
      
      let dictionary: any = {};
      let conflict: boolen = false;

      switch (merging) {
        case Merging.Replace:
          mergedValue = null;
          break;
        case Merging.Concat:
          mergedValue = Array.from(new Set([...previousValue.split(' '), ...nextValue.split(' ')])).sort().join(' ');
          break;
        case Merging.Array:
          for (const item of [...previousValue, ...nextValue]) {
            if (!dictionary[item.id]) {
              dictionary[item.id] = true;
            } else {
              conflict = true;
            }
          }
          if (!conflict) {
            mergedValue = [...previousValue, ...nextValue];
          } else {
            mergedValue = null;
          }
          break;
        case Merging.Dictionary:
          for (const key in previousValue) {
            if (previousValue.hasOwnProperty(key)) {
              dictionary[key] = previousValue[key];
            }
          }
          for (const key in nextValue) {
            if (nextValue.hasOwnProperty(key)) {
              if (!dictionary[key]) {
                dictionary[key] = nextValue[key];
              } else {
                conflict = true;
              }
            }
          }
          mergedValue = (conflict) ? null : dictionary;
          break;
        case Merging.SplitKeyValue:
          const previousSplitedValue = this.convertDictionaryIntoKeyValueString(previousValue);
          const nextSplitedValue = this.convertDictionaryIntoKeyValueString(nextValue);
          
          for (const key in previousValue) {
            if (previousValue.hasOwnProperty(key)) {
              dictionary[key] = previousValue[key];
            }
          }
          for (const key in nextValue) {
            if (nextValue.hasOwnProperty(key)) {
              if (!dictionary[key]) {
                dictionary[key] = nextValue[key];
              } else {
                conflict = true;
              }
            }
          }
          
          mergedValue = (conflict) ? null : this.convertDictionaryIntoKeyValueString(dictionary);
          break;
      }
    }
    
    if (strategy == null) return undefined;
    else return {
      strategy: strategy,
      previousValue: previousValue,
      nextValue: nextValue,
      mergedValue: mergedValue,
      keys: keys
    };
  }
  
  private recursiveResolveConflicts(previous: any, next: any, base: any, merged: any, keys: any[]=[], strategy: number=Merging.CombineDictionary) {
    if (Array.isArray(previous) && Array.isArray(next)) {
      if (strategy & Merging.UniqueTokenizeString) {
      
        throw new Error('NotImplementException');
      
      } else if (strategy & Merging.UniqueTokenizeKeyValueString) {
        
        throw new Error('NotImplementException');
        
      } else if (strategy & Merging.UniqueArray) {
        if (strategy & Merging.AlwaysReplace) {
          
          throw new Error('NotImplementException');
          
        } else if (strategy & Merging.NewerAlwaysReplace) {
          
          throw new Error('NotImplementException');
          
        } else {
          
          if (previous.some(item => item != null && typeof item !== 'string')) throw new Error('NotImplementException');
          if (next.some(item => item != null && typeof item !== 'string')) throw new Error('NotImplementException');
          
          merged.splice(0, 0, Array.from(new Set([...previous, ...next])));
          
        }
      } else if (strategy & Merging.CombineDictionary) {
        if (strategy & Merging.AlwaysReplace) {
          
          Object.assign(merged, previous);
          
          for (const item of next) {
            const m = merged.findIndex(_item => _item.id == item.id);
            
            if (m != -1) {
              merged[m] = item;
            } else {
              merged.push(item);
            }
          }
          
        } else if (strategy & Merging.NewerAlwaysReplace) {
          
          Object.assign(merged, base);
          
          for (const item of next) {
            const m = merged.findIndex(_item => _item.id == item.id);
            
            if (m != -1) {
              const p = previous.findIndex(_item => _item.id == item.id);
              const b = base.findIndex(_item => _item.id == item.id);
              
              if (p == -1 || CodeHelper.isEqual(previous[p], base[b])) {
                merged[m] = item;
              } else {
                
                /* CONFLICT */
                
              }
            } else {
              merged.push(item);
            }
          }
          
          for (const item of previous) {
            const m = merged.findIndex(_item => _item.id == item.id);
            
            if (m != -1) {
              const n = next.findIndex(_item => _item.id == item.id);
              const b = base.findIndex(_item => _item.id == item.id);
              
              if (n == -1 || CodeHelper.isEqual(next[n], base[b])) {
                merged[m] = item;
              } else {
                
                /* CONFLICT */
                
              }
            } else {
              merged.push(item);
            }
          }
          
        } else {
          
          throw new Error('NotImplementException');
          
        }
      } else if (strategy & Merging.CombineHTML) {
        
        /* Combine HTML */
        
      } else if (strategy & Merging.CombineJavaScript) {
        
        /* Combine JavaScript */
        
      }
      
      if (strategy & Merging.ReplacementLeveling) {
        
        /* Replacement Leveling */
        
      }
    } else if (typeof previous === 'Object' && typeof next === 'Object') {
      for (const key in previous) {
        if (previous.hasOwnProperty(key) && next.hasOwnProperty(key)) {
          if (strategy & Merging.UniqueTokenizeString) {
          
            merged[key] = Array.from(new Set([...previous[key] && previous[key].split(' ') || [],
              ...next[key] && next[key].split(' ') || []])).join(' ');
          
          } else if (strategy & Merging.UniqueTokenizeKeyValueString) {
            if (strategy & Merging.AlwaysReplace) {
              
              
              
            } else if (strategy & Merging.NewerAlwaysReplace) {
              
              
              
            } else {
              
              
              
            }
          } else if (strategy & Merging.UniqueArray) {
            if (strategy & Merging.AlwaysReplace) {
              
              
              
            } else if (strategy & Merging.NewerAlwaysReplace) {
              
              
              
            } else {
              
              
              
            }
          } else if (strategy & Merging.CombineDictionary) {
            if (strategy & Merging.AlwaysReplace) {
              
              
              
            } else if (strategy & Merging.NewerAlwaysReplace) {
              
              
              
            } else {
              
              
              
            }
          } else if (strategy & Merging.CombineHTML) {
          
            
          
          } else if (strategy & Merging.CombineJavaScript) {
          
            
          
          }
          
          if (strategy & Merging.ReplacementLeveling) {
            
            
            
          }
        }
      }
    }
  }
  
  public solveConflicts(featureBranch, destinationBranch) {
  	this.setState({loading: true, openning: true});
  	
  	
  	
  	return new Promise((async (resolve, reject) => {
  		try {
  		  const base = await RepositoryHelper.getMergeBaseProjectFile(featureBranch, destinationBranch);
  			const previous = await RepositoryHelper.getProjectFile(destinationBranch);
  			const next = await RepositoryHelper.getProjectFile(featureBranch);
  			const differenceInfo = {};
  			
  			// Global Settings
  			//
  			
  			/*
  			
  			const backEndControllerBlobSHADictKeys = Array.from(new Set([
  			  ...Object.keys(previous.backEndControllerBlobSHADict),
  			  ...Object.keys(next.backEndControllerBlobSHADict)
  			]));
  			
  			const backEndControllerBlobSHADictDifference = {};
  			
  			for (const key of backEndControllerBlobSHADictKeys) {
  			  
  			}
  			
  			const frontEndComponentsBlobSHADictKeys = Array.from(new Set([
  			  ...Object.keys(previous.frontEndComponentsBlobSHADict),
  			  ...Object.keys(next.frontEndComponentsBlobSHADict)
  			]));
  			
  			const frontEndComponentsBlobSHADictDifference = {};
  			
  			for (const key of frontEndComponentsBlobSHADictKeys) {
  			  if (previous.frontEndComponentsBlobSHADict.hasOwnProperty(key) &&
  			    !next.frontEndComponentsBlobSHADict.hasOwnProperty(key)) {
  			      frontEndComponentsBlobSHADictDifference[key] = 'delete/keep';
  			    }
  			  else if (next.frontEndComponentsBlobSHADict.hasOwnProperty(key) &&
  			    !previous.frontEndComponentsBlobSHADict.hasOwnProperty(key)) {
  			      frontEndComponentsBlobSHADictDifference[key] = 'delete/keep';
  			    }
  			  else if (next.frontEndComponentsBlobSHADict[key] != previous.frontEndComponentsBlobSHADict[key]) {
  			      frontEndComponentsBlobSHADictDifference[key] = 'checksum';
  			    }
  			}
  			
  			*/
  			
  			this.setState({
  			  differenceInfo: differenceInfo
  			});
  		} catch (error) {
  			this.close(error);
  		}
  	}).bind(this));
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
          .iframe-body(style={padding: '15px', fontSize: '8px'})
            | ${JSON.stringify(this.state.differenceInfo, 1, 1)}
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