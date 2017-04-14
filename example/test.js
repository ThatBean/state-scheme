const { Operation, ObjectAs, ArrayOf } = window.StateScheme

const assertEqual = (a, b) => {
  if (a === b) return
  console.warn('[assertEqual]', a, b)
}
const assertNotEqual = (a, b) => {
  if (a !== b) return
  console.warn('[assertNotEqual]', a, b)
}

window.testOperation = () => {
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

  const SAMPLE_ARRAY = []

  const OBJECT_DATA = { a: 1, A: SAMPLE_ARRAY }
  const ARRAY_DATA = [ 'a', SAMPLE_ARRAY ]

  // objectSet
  assertEqual(objectSet(OBJECT_DATA, 'a', 1), OBJECT_DATA)
  assertNotEqual(objectSet(OBJECT_DATA, 'a', 2), OBJECT_DATA)
  assertEqual(objectSet(OBJECT_DATA, 'A', SAMPLE_ARRAY), OBJECT_DATA)
  assertNotEqual(objectSet(OBJECT_DATA, 'A', []), OBJECT_DATA)
  assertNotEqual(objectSet(OBJECT_DATA, 'b', 2), OBJECT_DATA)
  assertEqual(objectSet(OBJECT_DATA, 'b', 2).b, 2)
  assertEqual(objectSet(OBJECT_DATA, 'b', SAMPLE_ARRAY).b, SAMPLE_ARRAY)
  assertNotEqual(objectSet(OBJECT_DATA, 'b', []).b, SAMPLE_ARRAY)

  // objectDelete
  assertNotEqual(objectDelete(OBJECT_DATA, 'a'), OBJECT_DATA)
  assertEqual(objectDelete(OBJECT_DATA, 'a').a, undefined)
  assertNotEqual(objectDelete(OBJECT_DATA, 'A'), OBJECT_DATA)
  assertEqual(objectDelete(OBJECT_DATA, 'A').A, undefined)
  assertEqual(objectDelete(OBJECT_DATA, 'b'), OBJECT_DATA)

  // objectMerge
  assertEqual(objectMerge(OBJECT_DATA, {}), OBJECT_DATA)
  assertEqual(objectMerge(OBJECT_DATA, OBJECT_DATA), OBJECT_DATA)
  assertEqual(objectMerge(OBJECT_DATA, { a: 1 }), OBJECT_DATA)
  assertEqual(objectMerge(OBJECT_DATA, { A: SAMPLE_ARRAY }), OBJECT_DATA)
  assertNotEqual(objectMerge(OBJECT_DATA, { a: 2 }), OBJECT_DATA)
  assertEqual(objectMerge(OBJECT_DATA, { a: 2 }).a, 2)
  assertNotEqual(objectMerge(OBJECT_DATA, { b: 2 }), OBJECT_DATA)
  assertEqual(objectMerge(OBJECT_DATA, { b: 2 }).b, 2)

  // arraySet
  assertEqual(arraySet(ARRAY_DATA, 0, 'a'), ARRAY_DATA)
  assertNotEqual(arraySet(ARRAY_DATA, 0, 'b'), ARRAY_DATA)
  assertEqual(arraySet(ARRAY_DATA, 0, 'b')[0], 'b')
  assertEqual(arraySet(ARRAY_DATA, 10, 'b')[10], 'b')

  // TODO: more tests
  // arrayDelete,
  // arrayInsert,
  // arrayPush,
  // arrayUnshift,
  // arrayPop,
  // arrayShift,
  // arrayConcat,
  // arrayMatchPush,
  // arrayMatchDelete,
  // arrayMatchMove,
  // arrayFindPush,
  // arrayFindDelete,
  // arrayFindMove,
  // arrayFindSet
}

window.testScheme = () => {
  const schemeA = ObjectAs('SchemeA', {
    id: '',
    a: 0,
    b: {},
    c: null
  })

  const schemeB = ObjectAs('SchemeB', Object.assign({}, schemeA.struct, {
    d: [],
    e: ''
  }))

  const schemeBList = ArrayOf('SchemeBList', schemeB)
  const schemeValueMap = ObjectAs('SchemeValueMap', { value: 'map' })
  const schemeValueList = ArrayOf('SchemeValueList', 0)

  const schemeC = ObjectAs('SchemeC', {
    stateA: schemeA,
    stateB: schemeB,
    stateBList: schemeBList,
    stateValueMap: schemeValueMap,
    stateValueList: schemeValueList
  })

  let stateMap = {}

  // test 0
  stateMap.initial = schemeC.reducer(undefined, {})
  assertEqual(stateMap.initial, schemeC.initialState)

  // test 1
  stateMap.a1 = schemeC.reducer(undefined, {})
  assertEqual(stateMap.a1, schemeC.initialState)

  // test 2
  stateMap.b1 = schemeC.reducer(undefined, { name: 'SchemeB', type: 'set', payload: { key: 'e', value: 'changedE' } })
  assertNotEqual(stateMap.b1, schemeC.initialState)
  assertNotEqual(stateMap.b1.stateB, schemeC.initialState.stateB)
  assertEqual(stateMap.b1.stateBList, schemeC.initialState.stateBList)
  assertEqual(stateMap.b1.stateB.e, 'changedE')

  // test 3
  stateMap.c1 = schemeC.reducer(undefined, { name: 'SchemeBList', type: 'push', payload: { value: Object.assign({}, schemeB.initialState, { id: 0 }) } })
  assertNotEqual(stateMap.c1, schemeC.initialState)
  assertEqual(stateMap.c1.stateB, schemeC.initialState.stateB)
  assertNotEqual(stateMap.c1.stateBList, schemeC.initialState.stateBList)
  stateMap.c2 = schemeC.reducer(stateMap.c1, { name: 'SchemeBList', type: 'push', payload: { value: Object.assign({}, schemeB.initialState, { id: 1 }) } })
  stateMap.c3 = schemeC.reducer(stateMap.c2, { name: 'SchemeA', type: 'set', payload: { key: 'id', value: 'set value' } })
  assertNotEqual(stateMap.c3, schemeC.initialState)
  assertEqual(stateMap.c3.stateB, schemeC.initialState.stateB)
  assertNotEqual(stateMap.c3.stateBList, schemeC.initialState.stateBList)
  assertEqual(stateMap.c3.stateBList.length, 2)
  stateMap.c4 = schemeC.reducer(stateMap.c3, {
    name: 'SchemeBList', index: 0, payload: { name: 'SchemeB', type: 'set', payload: { key: 'e', value: 'changedE0' } }
  })
  stateMap.c5 = schemeC.reducer(stateMap.c4, {
    name: 'SchemeBList', filter: { type: 'key-value', key: 'id', value: 1 }, payload: { name: 'SchemeB', type: 'set', payload: { key: 'e', value: 'changedE1' } }
  })
  stateMap.c5b = schemeC.reducer(stateMap.c3, {
    name: 'SchemeBList',
    batch: [
      { name: 'SchemeBList', index: 0, payload: { name: 'SchemeB', type: 'set', payload: { key: 'e', value: 'changedE0' } } },
      { name: 'SchemeBList', filter: { type: 'key-value', key: 'id', value: 1 }, payload: { name: 'SchemeB', type: 'set', payload: { key: 'e', value: 'changedE1' } } }
    ]
  })
  stateMap.c5b2 = schemeC.reducer(undefined, {
    name: 'SchemeC',
    batch: [
      { name: 'SchemeA', type: 'set', payload: { key: 'id', value: 'set value' } },
      { name: 'SchemeBList', type: 'push', payload: { value: Object.assign({}, schemeB.initialState, { id: 0 }) } },
      { name: 'SchemeBList', type: 'push', payload: { value: Object.assign({}, schemeB.initialState, { id: 1 }) } },
      { name: 'SchemeA', type: 'set', payload: { key: 'id', value: 'set value' } },
      {
        name: 'SchemeBList',
        batch: [
          { name: 'SchemeBList', index: 0, payload: { name: 'SchemeB', type: 'set', payload: { key: 'e', value: 'changedE0' } } },
          { name: 'SchemeBList', filter: { type: 'key-value', key: 'id', value: 1 }, payload: { name: 'SchemeB', type: 'set', payload: { key: 'e', value: 'changedE1' } } }
        ]
      }
    ]
  })
  assertEqual(stateMap.c4.stateBList[ 0 ].e, 'changedE0')
  assertEqual(stateMap.c5.stateBList[ 0 ].e, 'changedE0')
  assertEqual(stateMap.c5.stateBList[ 1 ].e, 'changedE1')

  // test 4
  stateMap.d0 = schemeValueList.reducer(undefined, {})
  stateMap.d1 = schemeValueList.reducer(stateMap.d0, { name: 'SchemeValueList', type: 'push', payload: { value: 0 } })
  stateMap.d2 = schemeValueList.reducer(stateMap.d1, { name: 'SchemeValueList', type: 'push', payload: { value: 1 } })
  stateMap.d3 = schemeValueList.reducer(stateMap.d2, { name: 'SchemeValueList', type: 'unshift', payload: { value: 2 } })
  stateMap.d4 = schemeValueList.reducer(stateMap.d3, { name: 'SchemeValueList', type: 'pop' })
  stateMap.d5 = schemeValueList.reducer(stateMap.d4, { name: 'SchemeValueList', type: 'shift' })
  stateMap.d6 = schemeValueList.reducer(stateMap.d5, { name: 'SchemeValueList', type: 'concat', payload: { concat: [ 4, 5, 6 ] } })
  stateMap.d7 = schemeValueList.reducer(stateMap.d6, { name: 'SchemeValueList', type: 'matchDelete', payload: { value: 5 } })
  stateMap.d3b = schemeValueList.reducer(undefined, {
    name: 'SchemeValueList',
    batch: [
      { name: 'SchemeValueList', type: 'push', payload: { value: 0 } },
      { name: 'SchemeValueList', type: 'push', payload: { value: 1 } },
      { name: 'SchemeValueList', type: 'unshift', payload: { value: 2 } }
    ]
  })
  stateMap.d7b = schemeValueList.reducer(stateMap.d3batch, {
    name: 'SchemeValueList',
    batch: [
      { name: 'SchemeValueList', type: 'pop' },
      { name: 'SchemeValueList', type: 'shift' },
      { name: 'SchemeValueList', type: 'concat', payload: { concat: [ 4, 5, 6 ] } },
      { name: 'SchemeValueList', type: 'matchDelete', payload: { value: 5 } }
    ]
  })

  // test 5
  stateMap.e0 = schemeValueMap.reducer(undefined, {})
  stateMap.e1 = schemeValueMap.reducer(stateMap.e0, { name: 'SchemeValueMap', type: 'set', payload: { key: 'key', value: 0 } })
  stateMap.e2 = schemeValueMap.reducer(stateMap.e1, { name: 'SchemeValueMap', type: 'merge', payload: { merge: { 1: 1, 'add': 'sub' } } })
  stateMap.e3 = schemeValueMap.reducer(stateMap.e2, { name: 'SchemeValueMap', type: 'delete', payload: { key: 'key' } })

  return {
    schemeA,
    schemeB,
    schemeBList,
    schemeValueMap,
    schemeValueList,
    schemeC,
    stateMap
  }
}
