import Operation from './operation'
import { Scheme, MapScheme, ListScheme } from './scheme'

const mapActionMap = {
  'map:set': (state, { key, value }) => Operation.mapSet(state, key, value),
  'map:merge': (state, { merge }) => Operation.mapMerge(state, merge)
}

const listActionMap = {
  'list:set': (state, { index, value }) => Operation.listSet(state, index, value),
  'list:insert': (state, { index, value }) => Operation.listInsert(state, index, value),
  'list:delete': (state, { index }) => Operation.listDelete(state, index),
  'list:push': (state, { value }) => Operation.listPush(state, value),
  'list:pop': (state, payload) => Operation.listPop(state),
  'list:shift': (state, payload) => Operation.listShift(state),
  'list:unshift': (state, { value }) => Operation.listUnshift(state, value),
  'list:concat': (state, { concat }) => Operation.listConcat(state, concat),
  'list:find-delete': (state, { value }) => Operation.listFindDelete(state, value),
  'list:find-move': (state, { index, value }) => Operation.listFindMove(state, index, value)
}

function MapOf (name, object, extraActionMap = {}) {
  return new MapScheme(name, Operation.mapCopy(object), { ...mapActionMap, ...extraActionMap })
}

function ListOf (name, itemScheme, extraActionMap = {}) {
  // if (itemScheme instanceof Scheme === false) throw new Error('expected scheme')
  return new ListScheme(name, [ itemScheme ], { ...listActionMap, ...extraActionMap })
}

export {
  MapOf,
  ListOf,
  mapActionMap,
  listActionMap
}

export default {
  MapOf,
  ListOf,
  mapActionMap,
  listActionMap
}
