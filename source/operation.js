/**
 * Operation for Immutable operate Data Structure
 * use only Object and Array for JSON support
 */

// Object
const objectCopy = (object) => {
  const result = {}
  for (const key in object) if (object.hasOwnProperty(key)) result[ key ] = object[ key ]
  return result
}

// Set === Object
const setAssign = (set, assign) => {
  assign.forEach((v) => set.add(v))
  return set
}

// Map === Object
const mapSet = (map, key, value) => (map[ key ] === value) ? map : { ...map, [key]: value }
const mapMerge = (map, merge) => {
  for (const key in merge) { // check if has new data
    const value = merge[ key ]
    if (map[ key ] === value) continue
    return { ...map, ...merge }
  }
  return map
}
const mapMap = (map, mapFunc) => {
  const result = {}
  for (const key in map) result[ key ] = mapFunc(map[ key ], key)
  return result
}

// List === Array
const listSet = (list, index, value) => {
  const nextList = [ ...list ]
  nextList[ index ] = value
  return nextList
}
const listInsert = (list, index, value) => [ ...list.slice(0, index), value, ...list.slice(index) ]
const listDelete = (list, index) => [ ...list.slice(0, index), ...list.slice(index + 1) ]
const listPush = (list, value) => [ ...list, value ]
const listPop = (list) => {
  const nextList = [ ...list ]
  nextList.pop()
  return nextList
}
const listShift = (list) => {
  const nextList = [ ...list ]
  nextList.shift()
  return nextList
}
const listUnshift = (list, value) => [ value, ...list ]
const listConcat = (list, concat) => [ ...list, ...concat ]
const listFindPush = (list, value) => ~list.indexOf(value) ? [ ...list, value ] : list
const listFindDelete = (list, value) => {
  const index = list.indexOf(value)
  return !~index ? list : [ ...list.slice(0, index), ...list.slice(index + 1) ]
}
const listFindMove = (list, index, value) => {
  const fromIndex = list.indexOf(value)
  if (!~fromIndex || fromIndex === index) return list
  if (fromIndex < index) return [ ...list.slice(0, fromIndex), ...list.slice(fromIndex + 1, index), value, ...list.slice(index) ]
  else return [ ...list.slice(0, index), value, ...list.slice(index, fromIndex), ...list.slice(fromIndex + 1) ]
}

export default {
  objectCopy,

  setAssign,

  mapSet,
  mapMerge,
  mapMap,

  listSet,
  listInsert,
  listDelete,
  listPush,
  listPop,
  listShift,
  listUnshift,
  listConcat,
  listFindPush,
  listFindDelete,
  listFindMove
}
