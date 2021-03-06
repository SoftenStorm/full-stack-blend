// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

const CodeHelper = {
  clone: (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
  },
  equals: (x: any, y: any) => {
    "use strict";

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
    const p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return CodeHelper.equals(x[i], y[i]); });
  },
  escape: (unsafe: string) => {
  	unsafe = unsafe || "";
  	return unsafe
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
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
  		keys.sort();
  		
  		let result = {};
  		for (let key of keys) {
  			result[key] = CodeHelper.recursiveSortHashtable(object[key]);
  		}
  		return result;
  	} else {
  		return object;
  	}
  }
};

export {CodeHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.