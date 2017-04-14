/**
 * Operation for Immutable operate Data Structure
 * use only Object and Array for JSON support
 */

// Object
const objectSet = (object, key, value) => (object[ key ] !== value) ? { ...object, [key]: value } : object
const objectDelete = (object, key) => {
  if (!(key in object)) return object
  const result = { ...object }
  delete result[ key ]
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
  if (array[ index ] === value) return array
  const result = [ ...array ]
  result[ index ] = value
  return result
}
const arrayDelete = (array, index) => (array.length >= index + 1) ? [ ...array.slice(0, index), ...array.slice(index + 1) ] : array
const arrayInsert = (array, index, value) => [ ...array.slice(0, index), value, ...array.slice(index) ] // ALWAYS CHANGE
const arrayPush = (array, value) => [ ...array, value ] // ALWAYS CHANGE
const arrayUnshift = (array, value) => [ value, ...array ] // ALWAYS CHANGE
const arrayPop = (array) => {
  if (array.length === 0) return array
  const result = [ ...array ]
  result.pop()
  return result
}
const arrayShift = (array) => {
  if (array.length === 0) return array
  const result = [ ...array ]
  result.shift()
  return result
}
const arrayConcat = (array, concat) => (concat && concat.length) ? [ ...array, ...concat ] : array
const arrayMatchPush = (array, value) => array.includes(value) ? [ ...array, value ] : array
const arrayMatchDelete = (array, value) => {
  const index = array.indexOf(value)
  return ~index ? [ ...array.slice(0, index), ...array.slice(index + 1) ] : array
}
const arrayMatchMove = (array, index, value) => {
  const fromIndex = array.indexOf(value)
  if (!~fromIndex || fromIndex === index) return array
  if (fromIndex < index) return [ ...array.slice(0, fromIndex), ...array.slice(fromIndex + 1, index), value, ...array.slice(index) ]
  else return [ ...array.slice(0, index), value, ...array.slice(index, fromIndex), ...array.slice(fromIndex + 1) ]
}
const arrayFindPush = (array, find, value) => array.find(find) === undefined ? [ ...array, value ] : array
const arrayFindDelete = (array, find) => {
  const index = array.findIndex(find)
  return ~index ? [ ...array.slice(0, index), ...array.slice(index + 1) ] : array
}
const arrayFindMove = (array, find, index) => {
  const fromIndex = array.findIndex(find)
  if (!~fromIndex || fromIndex === index) return array
  const value = array[ index ]
  if (fromIndex < index) return [ ...array.slice(0, fromIndex), ...array.slice(fromIndex + 1, index), value, ...array.slice(index) ]
  else return [ ...array.slice(0, index), value, ...array.slice(index, fromIndex), ...array.slice(fromIndex + 1) ]
}
const arrayFindSet = (array, find, value) => {
  const index = array.findIndex(find)
  if (!~index || array[ index ] === value) return array
  const result = [ ...array ]
  result[ index ] = value
  return result
}

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
}

export {
  Operation
}
