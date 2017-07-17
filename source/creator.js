import { Operation } from './operation'
import { ObjectScheme, ArrayScheme } from './scheme'

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
} = Operation

const objectActMap = {
  set: (state, { key, value }) => objectSet(state, key, value),
  delete: (state, { key }) => objectDelete(state, key),
  merge: (state, { merge }) => objectMerge(state, merge)
}

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
}

const ObjectAs = (name, object, extraActMap = {}) => new ObjectScheme(
  name,
  { ...object },
  { ...objectActMap, ...extraActMap }
)

const ArrayOf = (name, item, extraActMap = {}) => new ArrayScheme(
  name,
  [ item ],
  { ...arrayActMap, ...extraActMap }
)

export {
  ObjectAs,
  ArrayOf,
  objectActMap,
  arrayActMap
}
