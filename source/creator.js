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

const objectActMap = {
  'set': (state, { key, value }) => objectSet(state, key, value),
  'delete': (state, { key }) => objectDelete(state, key),
  'merge': (state, { merge }) => objectMerge(state, merge)
}

const arrayActMap = {
  'set': (state, { index, value }) => arraySet(state, index, value),
  'delete': (state, { index }) => arrayDelete(state, index),
  'insert': (state, { index, value }) => arrayInsert(state, index, value),
  'push': (state, { value }) => arrayPush(state, value),
  'pop': (state, payload) => arrayPop(state),
  'shift': (state, payload) => arrayShift(state),
  'unshift': (state, { value }) => arrayUnshift(state, value),
  'concat': (state, { concat }) => arrayConcat(state, concat),
  'findPush': (state, { value }) => arrayFindPush(state, value),
  'findDelete': (state, { value }) => arrayFindDelete(state, value),
  'findMove': (state, { index, value }) => arrayFindMove(state, index, value)
}

function ObjectAs (name, object, extraActMap = {}) {
  return new ObjectScheme(name, objectCopy(object), { ...objectActMap, ...extraActMap })
}

function ArrayOf (name, item, extraActMap = {}) {
  return new ArrayScheme(name, [ item ], { ...arrayActMap, ...extraActMap })
}

export {
  ObjectAs,
  ArrayOf,
  objectActMap,
  arrayActMap
}

export default {
  ObjectAs,
  ArrayOf,
  objectActMap,
  arrayActMap
}
