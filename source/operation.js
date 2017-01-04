/**
 * Operation for Immutable operate Data Structure
 * use only Object and Array for JSON support
 */

// Object
const objectSet = (object, key, value) => (object[ key ] === value) ? object : { ...object, [key]: value }
const objectCopy = (object) => ({ ...object })
const objectDelete = (object, key) => {
  if (!(key in object)) return object
  const result = { ...object }
  delete result[ key ]
  return result
}
const objectMap = (object, mapFunc) => {
  const result = {}
  for (const key in object) result[ key ] = mapFunc(object[ key ], key)
  return result
}
const objectMerge = (object, merge) => {
  for (const key in merge) { // check if has new data
    const value = merge[ key ]
    if (object[ key ] === value) continue
    return { ...object, ...merge }
  }
  return object
}

// array
const arraySet = (array, index, value) => {
  const result = [ ...array ]
  result[ index ] = value
  return result
}
const arrayDelete = (array, index) => [ ...array.slice(0, index), ...array.slice(index + 1) ]
const arrayInsert = (array, index, value) => [ ...array.slice(0, index), value, ...array.slice(index) ]
const arrayPush = (array, value) => [ ...array, value ]
const arrayUnshift = (array, value) => [ value, ...array ]
const arrayPop = (array) => {
  const result = [ ...array ]
  result.pop()
  return result
}
const arrayShift = (array) => {
  const result = [ ...array ]
  result.shift()
  return result
}
const arrayConcat = (array, concat) => [ ...array, ...concat ]
const arrayMatchPush = (array, value) => ~array.indexOf(value) ? array : [ ...array, value ]
const arrayMatchDelete = (array, value) => {
  const index = array.indexOf(value)
  return !~index ? array : [ ...array.slice(0, index), ...array.slice(index + 1) ]
}
const arrayMatchMove = (array, index, value) => {
  const fromIndex = array.indexOf(value)
  if (!~fromIndex || fromIndex === index) return array
  if (fromIndex < index) return [ ...array.slice(0, fromIndex), ...array.slice(fromIndex + 1, index), value, ...array.slice(index) ]
  else return [ ...array.slice(0, index), value, ...array.slice(index, fromIndex), ...array.slice(fromIndex + 1) ]
}
const arrayFindPush = (array, find, value) => ~array.findIndex(find) ? array : [ ...array, value ]
const arrayFindDelete = (array, find) => {
  const index = array.findIndex(find)
  return !~index ? array : [ ...array.slice(0, index), ...array.slice(index + 1) ]
}
const arrayFindMove = (array, find, index) => {
  const fromIndex = array.findIndex(find)
  if (!~fromIndex || fromIndex === index) return array
  const value = array[index]
  if (fromIndex < index) return [ ...array.slice(0, fromIndex), ...array.slice(fromIndex + 1, index), value, ...array.slice(index) ]
  else return [ ...array.slice(0, index), value, ...array.slice(index, fromIndex), ...array.slice(fromIndex + 1) ]
}
const arrayFindSet = (array, find, value) => {
  const index = array.findIndex(find)
  if (!~index || array[index] === value) return array
  const result = [ ...array ]
  result[ index ] = value
  return result
}

export {
  objectSet,
  objectCopy,
  objectDelete,
  objectMerge,
  objectMap,

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
}

export default {
  objectSet,
  objectCopy,
  objectDelete,
  objectMerge,
  objectMap,

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
}
