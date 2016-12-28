import {
  objectSet,
  objectCopy,
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
  arrayFindPush,
  arrayFindDelete,
  arrayFindMove
} from './operation'
import { ObjectScheme, ArrayScheme } from './scheme'

const objectActionReducerMap = {
  'set': (state, { key, value }) => objectSet(state, key, value),
  'delete': (state, { key }) => objectDelete(state, key),
  'merge': (state, { merge }) => objectMerge(state, merge)
}

const arrayActionReducerMap = {
  'set': (state, { index, value }) => arraySet(state, index, value),
  'delete': (state, { index }) => arrayDelete(state, index),
  'insert': (state, { index, value }) => arrayInsert(state, index, value),
  'push': (state, { value }) => arrayPush(state, value),
  'pop': (state, payload) => arrayPop(state),
  'shift': (state, payload) => arrayShift(state),
  'unshift': (state, { value }) => arrayUnshift(state, value),
  'concat': (state, { concat }) => arrayConcat(state, concat),
  'find-push': (state, { value }) => arrayFindPush(state, value),
  'find-delete': (state, { value }) => arrayFindDelete(state, value),
  'find-move': (state, { index, value }) => arrayFindMove(state, index, value)
}

function ObjectAs (name, object, extraActionReducerMap = {}) {
  return new ObjectScheme(name, objectCopy(object), { ...objectActionReducerMap, ...extraActionReducerMap })
}

function ArrayOf (name, item, extraActionReducerMap = {}) {
  return new ArrayScheme(name, [ item ], { ...arrayActionReducerMap, ...extraActionReducerMap })
}

export {
  ObjectAs,
  ArrayOf,
  objectActionReducerMap,
  arrayActionReducerMap
}

export default {
  ObjectAs,
  ArrayOf,
  objectActionReducerMap,
  arrayActionReducerMap
}
