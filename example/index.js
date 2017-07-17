(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["StateScheme"] = factory();
	else
		root["StateScheme"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Operation; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Operation for Immutable operate Data Structure
// use only Object and Array for JSON support

// Object
const objectSet = (object, key, value) => object[key] !== value ? _extends({}, object, { [key]: value }) : object;
const objectDelete = (object, key) => {
  if (!(key in object)) return object;
  const result = _extends({}, object);
  delete result[key];
  return result;
};
const objectMerge = (object, merge) => {
  for (const key in merge) {
    // check if has new data
    const value = merge[key];
    if (object[key] === value) continue;
    return _extends({}, object, merge);
  }
  return object;
};

// array
const arraySet = (array, index, value) => {
  if (array[index] === value) return array;
  const result = [...array];
  result[index] = value;
  return result;
};
const arrayDelete = (array, index) => index >= 0 && index <= array.length - 1 ? [...array.slice(0, index), ...array.slice(index + 1)] : array;
const arrayInsert = (array, index, value) => {
  // ALWAYS CHANGE
  index = Math.min(Math.max(index, 0), array.length);
  return [...array.slice(0, index), value, ...array.slice(index)];
};
const arrayPush = (array, value) => [...array, value]; // ALWAYS CHANGE
const arrayUnshift = (array, value) => [value, ...array]; // ALWAYS CHANGE
const arrayPop = array => {
  if (array.length === 0) return array;
  const result = [...array];
  result.pop();
  return result;
};
const arrayShift = array => {
  if (array.length === 0) return array;
  const result = [...array];
  result.shift();
  return result;
};
const arrayConcat = (array, concat) => concat && concat.length ? [...array, ...concat] : array;
const arrayMatchPush = (array, value) => !array.includes(value) ? [...array, value] : array;
const arrayMatchDelete = (array, value) => {
  const index = array.indexOf(value);
  return ~index ? [...array.slice(0, index), ...array.slice(index + 1)] : array;
};
const arrayMatchMove = (array, index, value) => {
  index = Math.min(Math.max(index, 0), array.length - 1);
  const fromIndex = array.indexOf(value);
  return !~fromIndex || fromIndex === index ? array : fromIndex < index ? [...array.slice(0, fromIndex), ...array.slice(fromIndex + 1, index + 1), value, ...array.slice(index + 1)] : [...array.slice(0, index), value, ...array.slice(index, fromIndex), ...array.slice(fromIndex + 1)];
};
const arrayFindPush = (array, find, value) => array.find(find) === undefined ? [...array, value] : array;
const arrayFindDelete = (array, find) => {
  const index = array.findIndex(find);
  return ~index ? [...array.slice(0, index), ...array.slice(index + 1)] : array;
};
const arrayFindMove = (array, find, index) => {
  const fromIndex = array.findIndex(find);
  const value = array[fromIndex];
  return !~fromIndex || fromIndex === index ? array : fromIndex < index ? [...array.slice(0, fromIndex), ...array.slice(fromIndex + 1, index + 1), value, ...array.slice(index + 1)] : [...array.slice(0, index), value, ...array.slice(index, fromIndex), ...array.slice(fromIndex + 1)];
};
const arrayFindSet = (array, find, value) => {
  const index = array.findIndex(find);
  if (!~index || array[index] === value) return array;
  const result = [...array];
  result[index] = value;
  return result;
};

const Operation = {
  objectSet,
  objectDelete,
  objectMerge,

  arraySet,
  arrayDelete,
  arrayInsert,
  arrayPush,
  arrayUnshift,
  arrayPop,
  arrayShift,
  arrayConcat,
  arrayMatchPush,
  arrayMatchDelete,
  arrayMatchMove,
  arrayFindPush,
  arrayFindDelete,
  arrayFindMove,
  arrayFindSet
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Scheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ObjectScheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayScheme; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const objectMap = (object, mapFunc) => {
  // ALWAYS CHANGE
  const result = {};
  for (const key in object) result[key] = mapFunc(object[key], key);
  return result;
};

const setAssign = (set, assign) => {
  assign.forEach(v => {
    set.has(v) && console.error('duplicate name in set', set, assign, v);
    set.add(v);
  });
  return set;
};

const methodCheck = (target, name) => target instanceof Object && name in target;

const toStructJSONWithCheck = value => methodCheck(value, 'toStructJSON') ? value.toStructJSON() : value;

const DEFAULT_REDUCER = (state, action) => {
  console.error('DEFAULT_REDUCER', state, action);
  return state;
};

class Scheme {
  constructor(name, struct, actMap) {
    this.name = name;
    this.struct = struct;
    this.actMap = actMap;
    this.initialState = null;
    this.acceptNameSet = null;
    this.actionReducer = null;
    this.structReducer = null;
    this.reducer = null;
  }

  getActionReducer() {
    const { actMap } = this;
    return (state, { type, payload }) => {
      const actionReducer = actMap[type];
      if (actionReducer) return actionReducer(state, payload); // processed
      // console.warn('missed action', type, payload)
      return state; // missed
    };
  }

  getReducer() {
    const { name, initialState, acceptNameSet, actionReducer, structReducer } = this;
    const reducer = (state, action) => action.type !== undefined && action.name === name ? actionReducer(state, action) // process accepted action here
    : structReducer(state, action); // pass action down
    return (state = initialState, action) => {
      if (!acceptNameSet.has(action.name)) return state; // filtered by accept name, (most case)
      if (action.batch !== undefined && action.name === name) return action.batch.reduce(reducer, state); // batched action
      return reducer(state, action); // single action
    };
  }

  toStructJSON() {
    return toStructJSONWithCheck(this.struct);
  }
}

class ObjectScheme extends Scheme {
  constructor(name, struct, actMap) {
    super(name, struct, actMap);

    const initialState = {};
    const acceptNameSet = new Set();
    acceptNameSet.add(this.name);
    const schemeKeyList = [];
    for (const key in this.struct) {
      if (!this.struct.hasOwnProperty(key)) continue;
      const value = this.struct[key];
      const isScheme = value instanceof Scheme;
      initialState[key] = isScheme ? value.initialState : value;
      if (isScheme) {
        setAssign(acceptNameSet, value.acceptNameSet);
        schemeKeyList.push(key);
      }
    }

    this.initialState = initialState;
    this.acceptNameSet = acceptNameSet;
    this.structReducer = ObjectScheme.getStructReducer(schemeKeyList, this.struct);
    this.actionReducer = this.getActionReducer();
    this.reducer = this.getReducer();
  }

  toStructJSON() {
    return objectMap(this.struct, toStructJSONWithCheck);
  }

  static getStructReducer(schemeKeyList, schemeMap) {
    return (state, action) => {
      let hasChanged = false;
      const changedState = {};
      for (let i = 0; i < schemeKeyList.length; i++) {
        const key = schemeKeyList[i];
        const scheme = schemeMap[key];
        const previousStateForKey = state[key];
        const nextStateForKey = scheme.reducer(previousStateForKey, action);
        changedState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
      return hasChanged ? _extends({}, state, changedState) : state;
    };
  }
}

class ArrayScheme extends Scheme {
  constructor(name, struct, actMap) {
    super(name, struct, actMap);

    const value = this.struct[0];
    const isScheme = value instanceof Scheme;
    const acceptNameSet = new Set();
    acceptNameSet.add(this.name);

    this.initialState = [];
    this.acceptNameSet = acceptNameSet;
    this.structReducer = isScheme ? ArrayScheme.getStructReducer(value) : DEFAULT_REDUCER;
    this.actionReducer = this.getActionReducer();
    this.reducer = this.getReducer();
  }

  toStructJSON() {
    return this.struct.map(toStructJSONWithCheck);
  }

  static getStructReducer(scheme) {
    return (arrayState, action) => {
      let hasChanged = false;
      let nextArrayState = null;

      function reduceItem(state, action, index) {
        // payload as item-action
        const nextState = scheme.reducer(state, action);
        if (state === nextState) return;
        if (!hasChanged) nextArrayState = [...arrayState];
        nextArrayState[index] = nextState;
        hasChanged = true;
      }

      if (action.index !== undefined) {
        reduceItem(arrayState[action.index], action.payload, action.index);
      } else if (action.filter !== undefined) {
        const filter = ArrayScheme.getFilter(action.filter);
        filter && arrayState.forEach((state, index) => filter(state, index) && reduceItem(state, action.payload, index));
      }
      return hasChanged ? nextArrayState : arrayState;
    };
  }

  static getFilter(filter) {
    // TODO: add more filters
    switch (filter.type) {
      case 'key-value':
        {
          const { key, value } = filter;
          return (state, index) => state[key] === value;
        }
    }
    return null;
  }
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operation__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Operation", function() { return __WEBPACK_IMPORTED_MODULE_0__operation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheme__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scheme", function() { return __WEBPACK_IMPORTED_MODULE_1__scheme__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectScheme", function() { return __WEBPACK_IMPORTED_MODULE_1__scheme__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayScheme", function() { return __WEBPACK_IMPORTED_MODULE_1__scheme__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__creator__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectAs", function() { return __WEBPACK_IMPORTED_MODULE_2__creator__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayOf", function() { return __WEBPACK_IMPORTED_MODULE_2__creator__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "objectActMap", function() { return __WEBPACK_IMPORTED_MODULE_2__creator__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "arrayActMap", function() { return __WEBPACK_IMPORTED_MODULE_2__creator__["c"]; });




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ObjectAs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return objectActMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return arrayActMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operation__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheme__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




const {
  objectSet,
  objectDelete,
  objectMerge,
  arraySet,
  arrayDelete,
  arrayInsert,
  arrayPush,
  arrayUnshift,
  arrayPop,
  arrayShift,
  arrayConcat,
  arrayMatchPush,
  arrayMatchDelete,
  arrayMatchMove,
  arrayFindPush,
  arrayFindDelete,
  arrayFindMove,
  arrayFindSet
} = __WEBPACK_IMPORTED_MODULE_0__operation__["a" /* Operation */];

const objectActMap = {
  set: (state, { key, value }) => objectSet(state, key, value),
  delete: (state, { key }) => objectDelete(state, key),
  merge: (state, { merge }) => objectMerge(state, merge)
};

const arrayActMap = {
  set: (state, { index, value }) => arraySet(state, index, value),
  delete: (state, { index }) => arrayDelete(state, index),
  insert: (state, { index, value }) => arrayInsert(state, index, value),
  push: (state, { value }) => arrayPush(state, value),
  pop: (state, payload) => arrayPop(state),
  shift: (state, payload) => arrayShift(state),
  unshift: (state, { value }) => arrayUnshift(state, value),
  concat: (state, { concat }) => arrayConcat(state, concat),
  matchPush: (state, { value }) => arrayMatchPush(state, value),
  matchDelete: (state, { value }) => arrayMatchDelete(state, value),
  matchMove: (state, { index, value }) => arrayMatchMove(state, index, value),
  findPush: (state, { find, value }) => arrayFindPush(state, find, value),
  findDelete: (state, { find }) => arrayFindDelete(state, find),
  findMove: (state, { find, index }) => arrayFindMove(state, find, index),
  findSet: (state, { find, value }) => arrayFindSet(state, find, value)
};

const ObjectAs = (name, object, extraActMap = {}) => new __WEBPACK_IMPORTED_MODULE_1__scheme__["b" /* ObjectScheme */](name, _extends({}, object), _extends({}, objectActMap, extraActMap));

const ArrayOf = (name, item, extraActMap = {}) => new __WEBPACK_IMPORTED_MODULE_1__scheme__["a" /* ArrayScheme */](name, [item], _extends({}, arrayActMap, extraActMap));



/***/ })
/******/ ]);
});