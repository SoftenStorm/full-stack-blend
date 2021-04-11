import {TextHelper} from './TextHelper';
import {RandomHelper} from './RandomHelper';
import {HTMLHelper} from './HTMLHelper';
import {INTERNAL_CLASSES_GLOBAL_REGEX, NON_SINGLE_CONSECUTIVE_SPACE_GLOBAL_REGEX, CAMEL_OF_EVENTS_DICTIONARY, NONE_NATIVE_SUPPORT_OF_CAMEL_OF_EVENTS} from '../Constants';

const KEYSTRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

declare let ts: any;

function createDefaultFormatCodeSettings(): ts.FormatCodeSettings {
    return {
        baseIndentSize: 0,
        indentSize: 2,
        tabSize: 2,
        indentStyle: ts.IndentStyle.Smart,
        newLineCharacter: "\r\n",
        convertTabsToSpaces: true,
        insertSpaceAfterCommaDelimiter: true,
        insertSpaceAfterSemicolonInForStatements: true,
        insertSpaceBeforeAndAfterBinaryOperators: true,
        insertSpaceAfterConstructor: false,
        insertSpaceAfterKeywordsInControlFlowStatements: true,
        insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
        insertSpaceAfterTypeAssertion: false,
        insertSpaceBeforeFunctionParenthesis: false,
        placeOpenBraceOnNewLineForFunctions: false,
        placeOpenBraceOnNewLineForControlBlocks: false,
        insertSpaceBeforeTypeAnnotation: false
    };
}

function utf8_encode(source: string) {
    source = source.replace(/\r\n/g,"\n");
    var utftext = "";
		
    for (var n = 0; n < source.length; n++) {
        var c = source.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
		
    return utftext;
}

class LanguageServiceHost implements ts.LanguageServiceHost {
    files: ts.MapLike<ts.IScriptSnapshot> = {};
    addFile(fileName: string, text: string) {
        this.files[fileName] = ts.ScriptSnapshot.fromString(text);
    }
		
    getCompilationSettings = () => ts.getDefaultCompilerOptions();
    getScriptFileNames = () => Object.keys(this.files);
    getScriptVersion = (_fileName: string) => "0";
    getScriptSnapshot = (fileName: string) => this.files[fileName];
    getCurrentDirectory = () => process.cwd();
    getDefaultLibFileName = (options: ts.CompilerOptions) => ts.getDefaultLibFilePath(options);
}

export function formatTSCode(fileName: string, text: string, options = createDefaultFormatCodeSettings()) {
    const host = new LanguageServiceHost();
    host.addFile(fileName, text);
		
    const languageService = ts.createLanguageService(host);
    const edits = languageService.getFormattingEditsForDocument(fileName, options);
    edits
        .sort((a, b) => a.span.start - b.span.start)
        .reverse()
        .forEach(edit => {
            const head = text.slice(0, edit.span.start);
            const tail = text.slice(edit.span.start + edit.span.length);
            text = `${head}${edit.newText}${tail}`;
        });
		
    return text;
}

var CodeHelper = {
  clone: (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
  },
  convertToBase64: (source: string) => {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    source = utf8_encode(source);

    while (i < source.length) {
      chr1 = source.charCodeAt(i++);
      chr2 = source.charCodeAt(i++);
      chr3 = source.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
      KEYSTRING.charAt(enc1) + KEYSTRING.charAt(enc2) +
      KEYSTRING.charAt(enc3) + KEYSTRING.charAt(enc4);
    }
    
    return output;
	},
	getCustomClasses: (value: string) => {
    return (value || '').replace(INTERNAL_CLASSES_GLOBAL_REGEX, '').replace(NON_SINGLE_CONSECUTIVE_SPACE_GLOBAL_REGEX, ' ').trimStart();
  },  
  getInternalClasses: (value: string) => {
    return (value || '').match(INTERNAL_CLASSES_GLOBAL_REGEX).join(' ');
  },
  convertDictionaryIntoPairs: (dictionary: {[Identifier: string]: any}) => {
    let pairs = [];
    
    for (let key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
        pairs.push({
          name: key,
          value: dictionary[key]
        });
      }
    }
    
    return pairs;
  },
  equals: (x: any, y: any) => {
    'use strict';

    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return CodeHelper.equals(x[i], y[i]); });
  },
  sortHashtable: (object: any) => {
  	return CodeHelper.recursiveSortHashtable(object);
  },
  recursiveSortHashtable: (object: any) => {
  	if (Array.isArray(object)) {
  		for (let i=0; i<object.length; i++) {
  			object[i] = CodeHelper.recursiveSortHashtable(object[i]);
  		}
  		
  		return object;
  	} else if ((typeof object === 'object') && object != null) {
  		let keys = Object.keys(object);
  		keys.sort((a, b) => {
  			if (a.indexOf('__') == 0 && b.indexOf('__') != 0) return 1;
  			else if (b.indexOf('__') == 0 && a.indexOf('__') != 0) return -1;
  			else return (a < b) ? -1 : 1;
  		});
  		
  		let result = {};
  		for (let key of keys) {
  			result[key] = CodeHelper.recursiveSortHashtable(object[key]);
  		}
  		return result;
  	} else {
  		return object;
  	}
  },
  deleteEmptyKeys: (object: any) => {
  	let result: boolean;
  	do {
  		result = false;
  		const keys = Object.keys(object);
  		for (let key of keys) {
  			result = result || CodeHelper.recursiveDeleteEmptyKeys(object, key);
  		}
  	} while (result);
  },
  recursiveDeleteEmptyKeys: (object: any, previousKey: string): boolean => {
  	if ((typeof object[previousKey] !== 'object') || object[previousKey] === null || object[previousKey] === undefined) return false;
  	
  	const keys = Object.keys(object[previousKey]);
  	if (keys.length == 0) {
  		delete object[previousKey];
  		return true;
  	} else {
  		let result = false;
  		for (let nextKey of keys) {
  			result = result || CodeHelper.recursiveDeleteEmptyKeys(object[previousKey], nextKey);
  		}
  		return result;
  	}
  },
  replaceCamelIntoDashCase: (camelCase: string): string => {
  	if (camelCase.indexOf('internal-fsb-') != -1) return camelCase;
  	if (camelCase.indexOf('data-') == 0) return camelCase;
  	if (CAMEL_OF_EVENTS_DICTIONARY[camelCase.toLowerCase()]) return camelCase;
  	if (NONE_NATIVE_SUPPORT_OF_CAMEL_OF_EVENTS.indexOf(camelCase.toLowerCase()) != -1) return camelCase;
  	
  	return TextHelper.trim(camelCase.replace(/[A-Z]/g, token => `-${token.toLowerCase()}`), '-');
  },
  replaceDashIntoCamelCase: (dashCase: string): string => {
  	if (dashCase.indexOf('internal-fsb-') != -1) return dashCase;
  	if (dashCase.indexOf('data-') == 0) return dashCase;
  	if (CAMEL_OF_EVENTS_DICTIONARY[dashCase.toLowerCase()]) return dashCase;
  	if (NONE_NATIVE_SUPPORT_OF_CAMEL_OF_EVENTS.indexOf(dashCase.toLowerCase()) != -1) return dashCase;
  	
  	return TextHelper.trim(dashCase, '-').replace(/\-[a-z]/g, token => token.substring(1).toUpperCase());
  },
  preparePastingContent: (html: string, cut: boolean=false): string => {
  	let contentHolder = document.createElement('div');
  	contentHolder.innerHTML = html;
  	
  	CodeHelper.recursivePreparePastingContent(contentHolder, cut);
  	
  	return contentHolder.innerHTML;
  },
  recursivePreparePastingContent: (current: any, cut: boolean=false, isContainingInComponent: boolean=false) => {
  	if (!cut && HTMLHelper.hasAttribute(current, 'internal-fsb-reusable-preset-name')) {
  		const guid = HTMLHelper.getAttribute(current, 'internal-fsb-guid');
  		
  		const classes = (current.className || '').split(' ');
  		for (let classname of classes) {
  			if (classname.indexOf('-fsb-preset-') == 0) {
  				HTMLHelper.removeClass(current, '-fsb-preset-' + guid);
  			}
  		}
  		
  		HTMLHelper.addClass(current, '-fsb-preset-' + guid);
  		
  		let _inlineStyle = HTMLHelper.getAttribute(current, 'style') || '';
  		_inlineStyle = HTMLHelper.setInlineStyle(_inlineStyle, '-fsb-inherited-presets', '');
      HTMLHelper.setAttribute(current, 'style', _inlineStyle);
      
  		HTMLHelper.removeAttribute(current, 'internal-fsb-reusable-preset-name');
  	}
  	
  	if (!cut && !isContainingInComponent && HTMLHelper.hasAttribute(current, 'internal-fsb-guid')) {
  		HTMLHelper.setAttribute(current, 'internal-fsb-guid', RandomHelper.generateGUID());
  	}
  	
  	if (HTMLHelper.hasClass(current, 'internal-fsb-accessory')) {
  		current.remove();
  		return; 
  	}
  	
  	for (let element of current.children) {
  		CodeHelper.recursivePreparePastingContent(element, cut, isContainingInComponent || !!HTMLHelper.getAttribute(current, 'internal-fsb-inheriting'));
  	}
  },
  formatTSCode: (code: string, indent: boolean=false) => {
  	const shorthandCode = '/* INTERNAL_FSB_FORMATTING_SHORTHAND */{';
  	
  	code = code.replace(/\@\{/g, shorthandCode);
  	
  	if (indent) {
  		const beginCode = '/* INTERNAL_FSB_FORMATTING_BEGIN */class Controller extends Base {\n';
			const endCode = '\n}/* INTERNAL_FSB_FORMATTING_END */';
			
			code = formatTSCode('', `${beginCode}${code}${endCode}`);
			code = code.replace(beginCode, '').replace(endCode, '');
  	} else {
  		code = formatTSCode('', code);
  	}
  	
  	while (code.indexOf(shorthandCode) != -1) {
  		code = code.replace(shorthandCode, '@{');
  	}
  	
  	return code;
  }
};

export {CodeHelper};