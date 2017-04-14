const { Operation, ObjectAs, ArrayOf } = window.StateScheme

const assertEqual = (a, b) => {
  if (a === b) return
  console.error('[assertEqual]', a, b)
}
const assertNotEqual = (a, b) => {
  if (a !== b) return
  console.error('[assertNotEqual]', a, b)
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
  assertEqual(arraySet(ARRAY_DATA, 0, 'b')[ 0 ], 'b')
  assertEqual(arraySet(ARRAY_DATA, 10, 'b')[ 10 ], 'b')

  // arrayDelete
  assertEqual(arrayDelete(ARRAY_DATA, -1), ARRAY_DATA)
  assertEqual(arrayDelete(ARRAY_DATA, 99), ARRAY_DATA)
  assertNotEqual(arrayDelete(ARRAY_DATA, 0), ARRAY_DATA)
  assertEqual(arrayDelete(ARRAY_DATA, 0)[ 0 ], SAMPLE_ARRAY)

  // arrayInsert
  assertNotEqual(arrayInsert(ARRAY_DATA, 0, 'I'), ARRAY_DATA)
  assertNotEqual(arrayInsert(ARRAY_DATA, 6, 'I'), ARRAY_DATA)
  assertNotEqual(arrayInsert(ARRAY_DATA, -1, 'I'), ARRAY_DATA)
  assertEqual(arrayInsert(ARRAY_DATA, 0, 'I')[ 0 ], 'I')
  assertEqual(arrayInsert(ARRAY_DATA, 1, 'I')[ 1 ], 'I')
  assertEqual(arrayInsert(ARRAY_DATA, 2, 'I')[ 2 ], 'I')
  assertEqual(arrayInsert(ARRAY_DATA, 6, 'I')[ 2 ], 'I')
  assertNotEqual(arrayInsert(ARRAY_DATA, 6, 'I')[ 6 ], 'I')
  assertEqual(arrayInsert(ARRAY_DATA, 0, 'I')[ 0 ], 'I')
  assertEqual(arrayInsert(ARRAY_DATA, -1, 'I')[ 0 ], 'I')
  assertNotEqual(arrayInsert(ARRAY_DATA, -1, 'I')[ -1 ], 'I')

  // arrayPush
  assertNotEqual(arrayPush(ARRAY_DATA, 'I'), ARRAY_DATA)
  assertEqual(arrayPush(ARRAY_DATA, 'I')[ 2 ], 'I')

  // arrayUnshift
  assertNotEqual(arrayUnshift(ARRAY_DATA, 'I'), ARRAY_DATA)
  assertEqual(arrayUnshift(ARRAY_DATA, 'I')[ 0 ], 'I')

  // arrayPop
  assertNotEqual(arrayPop(ARRAY_DATA), ARRAY_DATA)
  assertEqual(arrayPop(ARRAY_DATA)[ 0 ], 'a')
  assertNotEqual(arrayPop(ARRAY_DATA)[ 0 ], SAMPLE_ARRAY)
  assertNotEqual(arrayPop(ARRAY_DATA)[ 1 ], SAMPLE_ARRAY)
  assertEqual(arrayPop(ARRAY_DATA).length, 1)

  // arrayShift
  assertNotEqual(arrayShift(ARRAY_DATA), ARRAY_DATA)
  assertEqual(arrayShift(ARRAY_DATA)[ 0 ], SAMPLE_ARRAY)
  assertNotEqual(arrayShift(ARRAY_DATA)[ 0 ], 'a')
  assertNotEqual(arrayShift(ARRAY_DATA)[ 1 ], 'a')
  assertEqual(arrayShift(ARRAY_DATA).length, 1)

  // arrayConcat
  assertEqual(arrayConcat(ARRAY_DATA, null), ARRAY_DATA)
  assertEqual(arrayConcat(ARRAY_DATA, []), ARRAY_DATA)
  assertNotEqual(arrayConcat(ARRAY_DATA, [ 1 ]), ARRAY_DATA)
  assertEqual(arrayConcat(ARRAY_DATA, [ 1 ])[ 2 ], 1)
  assertEqual(arrayConcat(ARRAY_DATA, [ 1 ]).length, 3)

  // arrayMatchPush
  assertEqual(arrayMatchPush(ARRAY_DATA, 'a'), ARRAY_DATA)
  assertEqual(arrayMatchPush(ARRAY_DATA, SAMPLE_ARRAY), ARRAY_DATA)
  assertNotEqual(arrayMatchPush(ARRAY_DATA, 1), ARRAY_DATA)
  assertNotEqual(arrayMatchPush(ARRAY_DATA, [ 1 ]), ARRAY_DATA)
  assertEqual(arrayMatchPush(ARRAY_DATA, 1)[ 2 ], 1)
  assertEqual(arrayMatchPush(ARRAY_DATA, 1).length, 3)

  // arrayMatchDelete
  assertNotEqual(arrayMatchDelete(ARRAY_DATA, 'a'), ARRAY_DATA)
  assertNotEqual(arrayMatchDelete(ARRAY_DATA, SAMPLE_ARRAY), ARRAY_DATA)
  assertEqual(arrayMatchDelete(ARRAY_DATA, 1), ARRAY_DATA)
  assertEqual(arrayMatchDelete(ARRAY_DATA, [ 1 ]), ARRAY_DATA)
  assertEqual(arrayMatchDelete(ARRAY_DATA, 'a')[ 0 ], SAMPLE_ARRAY)
  assertEqual(arrayMatchDelete(ARRAY_DATA, 'a').length, 1)

  // arrayMatchMove
  assertNotEqual(arrayMatchMove(ARRAY_DATA, 1, 'a'), ARRAY_DATA)
  assertNotEqual(arrayMatchMove(ARRAY_DATA, 2, 'a'), ARRAY_DATA)
  assertEqual(arrayMatchMove(ARRAY_DATA, 0, 'a'), ARRAY_DATA)
  assertEqual(arrayMatchMove(ARRAY_DATA, 1, 'a').length, 2)
  assertEqual(arrayMatchMove(ARRAY_DATA, 1, 'a')[ 1 ], 'a')
  assertEqual(arrayMatchMove(ARRAY_DATA, -1, 'a'), arrayMatchMove(ARRAY_DATA, 0, 'a'))
  assertEqual(arrayMatchMove(ARRAY_DATA, 2, 'a')[ 0 ], arrayMatchMove(ARRAY_DATA, 1, 'a')[ 0 ])
  assertEqual(arrayMatchMove(ARRAY_DATA, 2, 'a')[ 1 ], arrayMatchMove(ARRAY_DATA, 1, 'a')[ 1 ])

  // arrayFindPush
  assertNotEqual(arrayFindPush(ARRAY_DATA, (v) => v === 'F', 'F'), ARRAY_DATA)
  assertNotEqual(arrayFindPush(ARRAY_DATA, (v) => false, 'F'), ARRAY_DATA)
  assertEqual(arrayFindPush(ARRAY_DATA, (v) => v === 'a', 'F'), ARRAY_DATA)
  assertEqual(arrayFindPush(ARRAY_DATA, (v) => true, 'F'), ARRAY_DATA)
  assertEqual(arrayFindPush(ARRAY_DATA, (v) => false, 'F')[ 2 ], 'F')
  assertEqual(arrayFindPush(ARRAY_DATA, (v) => false, 'F').length, 3)

  // arrayFindDelete
  assertEqual(arrayFindDelete(ARRAY_DATA, (v) => v === 'F'), ARRAY_DATA)
  assertEqual(arrayFindDelete(ARRAY_DATA, (v) => false), ARRAY_DATA)
  assertNotEqual(arrayFindDelete(ARRAY_DATA, (v) => v === 'a'), ARRAY_DATA)
  assertNotEqual(arrayFindDelete(ARRAY_DATA, (v) => true), ARRAY_DATA)
  assertEqual(arrayFindDelete(ARRAY_DATA, (v) => true)[ 0 ], SAMPLE_ARRAY)
  assertEqual(arrayFindDelete(ARRAY_DATA, (v) => true).length, 1)

  // arrayFindMove
  assertEqual(arrayFindMove(ARRAY_DATA, (v) => v === 'F', 2), ARRAY_DATA)
  assertEqual(arrayFindMove(ARRAY_DATA, (v) => false, 2), ARRAY_DATA)
  assertNotEqual(arrayFindMove(ARRAY_DATA, (v) => v === 'a', 2), ARRAY_DATA)
  assertNotEqual(arrayFindMove(ARRAY_DATA, (v) => true, 2), ARRAY_DATA)
  assertEqual(arrayFindMove(ARRAY_DATA, (v) => true, 1)[ 0 ], SAMPLE_ARRAY)
  assertEqual(arrayFindMove(ARRAY_DATA, (v) => true, 1)[ 1 ], 'a')
  assertEqual(arrayFindMove(ARRAY_DATA, (v) => true, 1).length, 2)
  assertEqual(arrayFindMove(ARRAY_DATA, (v) => true, 2)[ 0 ], arrayFindMove(ARRAY_DATA, (v) => true, 1)[ 0 ])
  assertEqual(arrayFindMove(ARRAY_DATA, (v) => true, 2)[ 1 ], arrayFindMove(ARRAY_DATA, (v) => true, 1)[ 1 ])

  // arrayFindSet
  assertEqual(arrayFindSet(ARRAY_DATA, (v) => v === 'F', 'F'), ARRAY_DATA)
  assertEqual(arrayFindSet(ARRAY_DATA, (v) => false, 'F'), ARRAY_DATA)
  assertNotEqual(arrayFindSet(ARRAY_DATA, (v) => v === 'a', 'F'), ARRAY_DATA)
  assertNotEqual(arrayFindSet(ARRAY_DATA, (v) => true, 'F'), ARRAY_DATA)
  assertEqual(arrayFindSet(ARRAY_DATA, (v) => true, 'F')[ 0 ], 'F')
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
