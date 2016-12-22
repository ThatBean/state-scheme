const { MapOf, ListOf } = window.StateScheme

window.test = () => {
  const schemeA = MapOf('SchemeA', {
    id: '',
    a: 0,
    b: {},
    c: null
  })

  const schemeB = MapOf('SchemeB', Object.assign({}, schemeA.struct, {
    d: [],
    e: ''
  }))

  const schemeBList = ListOf('SchemeBList', schemeB)

  const schemeValueList = ListOf('schemeValueList', 0)

  const schemeC = MapOf('SchemeC', {
    stateA: schemeA,
    stateB: schemeB,
    stateBList: schemeBList,
    stateValueList: schemeValueList
  })

  let stateMap = {}

  // test 0
  stateMap.initial = schemeC.reducer(undefined, {})
  console.assert(stateMap.initial === schemeC.initialState)

  // test 1
  stateMap.a1 = schemeC.reducer(stateMap.initial, {})
  console.assert(stateMap.a1 === schemeC.initialState)

  // test 2
  stateMap.b1 = schemeC.reducer(stateMap.initial, { name: 'SchemeB', type: 'map:set', payload: { key: 'e', value: 'changedE' } })
  console.assert(stateMap.b1 !== schemeC.initialState)
  console.assert(stateMap.b1.stateB !== schemeC.initialState.stateB)
  console.assert(stateMap.b1.stateBList === schemeC.initialState.stateBList)
  console.assert(stateMap.b1.stateB.e === 'changedE')

  // test 3
  stateMap.c1 = schemeC.reducer(stateMap.initial, { name: 'SchemeBList', type: 'list:push', payload: { value: Object.assign({}, schemeB.initialState, { id: 0 }) } })
  console.assert(stateMap.c1 !== schemeC.initialState)
  console.assert(stateMap.c1.stateB === schemeC.initialState.stateB)
  console.assert(stateMap.c1.stateBList !== schemeC.initialState.stateBList)
  stateMap.c2 = schemeC.reducer(stateMap.c1, { name: 'SchemeBList', type: 'list:push', payload: { value: Object.assign({}, schemeB.initialState, { id: 1 }) } })
  stateMap.c3 = schemeC.reducer(stateMap.c2, { name: 'SchemeBList', type: 'list:push', payload: { value: Object.assign({}, schemeB.initialState, { id: 2 }) } })
  console.assert(stateMap.c3 !== schemeC.initialState)
  console.assert(stateMap.c3.stateB === schemeC.initialState.stateB)
  console.assert(stateMap.c3.stateBList !== schemeC.initialState.stateBList)
  console.assert(stateMap.c3.stateBList.length === 3)
  stateMap.c4 = schemeC.reducer(stateMap.c3, {
    name: 'SchemeB',
    index: 0,
    payload: { name: 'SchemeB', type: 'map:set', payload: { key: 'e', value: 'changedE0' } }
  })
  stateMap.c5 = schemeC.reducer(stateMap.c4, {
    name: 'SchemeB',
    filter: { type: 'key-value', key: 'id', value: 1 },
    payload: { name: 'SchemeB', type: 'map:set', payload: { key: 'e', value: 'changedE1' } }
  })
  console.assert(stateMap.c4.stateBList[ 0 ].e === 'changedE0')
  console.assert(stateMap.c5.stateBList[ 0 ].e === 'changedE0')
  console.assert(stateMap.c5.stateBList[ 1 ].e === 'changedE1')

  // test 4
  stateMap.d0 = schemeValueList.reducer(undefined, {})
  stateMap.d1 = schemeValueList.reducer(stateMap.d0, { name: 'schemeValueList', type: 'list:push', payload: { value: 0 } })
  stateMap.d2 = schemeValueList.reducer(stateMap.d1, { name: 'schemeValueList', type: 'list:push', payload: { value: 1 } })
  stateMap.d3 = schemeValueList.reducer(stateMap.d2, { name: 'schemeValueList', type: 'list:unshift', payload: { value: 2 } })
  stateMap.d4 = schemeValueList.reducer(stateMap.d3, { name: 'schemeValueList', type: 'list:pop' })
  stateMap.d5 = schemeValueList.reducer(stateMap.d4, { name: 'schemeValueList', type: 'list:shift' })
  stateMap.d6 = schemeValueList.reducer(stateMap.d5, { name: 'schemeValueList', type: 'list:concat', payload: { concat: [ 4, 5, 6 ] } })
  stateMap.d7 = schemeValueList.reducer(stateMap.d6, { name: 'schemeValueList', type: 'list:find-delete', payload: { value: 5 } })

  return {
    schemeA,
    schemeB,
    schemeBList,
    schemeValueList,
    schemeC,
    stateMap
  }
}
