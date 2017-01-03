import Operation from './operation'

const __DEV__ = process.env.NODE_ENV !== 'production'

const setAssign = (set, assign) => {
  assign.forEach((v) => {
    set.has(v) && console.error('duplicate name in set', set, assign, v)
    set.add(v)
  })
  return set
}

const methodCheck = (target, name) => target instanceof Object && name in target

const toStructJSONWithCheck = (value) => methodCheck(value, 'toStructJSON') ? value.toStructJSON() : value

const DEFAULT_REDUCER = (state, action) => {
  console.error('DEFAULT_REDUCER', state, action)
  return state
}

class Scheme {
  constructor (name, struct, actMap) {
    this.name = name
    this.struct = struct
    this.actMap = actMap
    this.initialState = null
    this.acceptNameSet = null
    this.actionReducer = null
    this.structReducer = null
    this.reducer = null
  }

  getActionReducer () {
    const { actMap } = this
    return (state, { type, payload }) => {
      const actionReducer = actMap[ type ]
      if (actionReducer) return actionReducer(state, payload) // processed
      __DEV__ && console.warn('missed action', type, payload)
      return state // missed
    }
  }

  getReducer () {
    const { name, initialState, acceptNameSet, actionReducer, structReducer } = this
    const reducer = (state, action) => (action.type !== undefined && action.name === name)
      ? actionReducer(state, action) // process accepted action here
      : structReducer(state, action) // pass action down
    return (state = initialState, action) => {
      if (!acceptNameSet.has(action.name)) return state // filtered by accept name, (most case)
      if (action.batch !== undefined && action.name === name) return action.batch.reduce(reducer, state) // batched action
      return reducer(state, action) // single action
    }
  }

  toStructJSON () { return toStructJSONWithCheck(this.struct) }
}

class ObjectScheme extends Scheme {
  constructor (name, struct, actMap) {
    super(name, struct, actMap)

    const initialState = {}
    const acceptNameSet = new Set()
    acceptNameSet.add(this.name)
    const schemeKeyList = []
    for (const key in this.struct) {
      if (!this.struct.hasOwnProperty(key)) continue
      const value = this.struct[ key ]
      const isScheme = value instanceof Scheme
      initialState[ key ] = isScheme ? value.initialState : value
      if (isScheme) {
        setAssign(acceptNameSet, value.acceptNameSet)
        schemeKeyList.push(key)
      }
    }

    this.initialState = initialState
    this.acceptNameSet = acceptNameSet
    this.structReducer = ObjectScheme.getStructReducer(schemeKeyList, this.struct)
    this.actionReducer = this.getActionReducer()
    this.reducer = this.getReducer()
  }

  toStructJSON () { return Operation.objectMap(this.struct, toStructJSONWithCheck) }

  static getStructReducer (schemeKeyList, schemeMap) {
    return (state, action) => {
      let hasChanged = false
      const changedState = {}
      for (let i = 0; i < schemeKeyList.length; i++) {
        const key = schemeKeyList[ i ]
        const scheme = schemeMap[ key ]
        const previousStateForKey = state[ key ]
        const nextStateForKey = scheme.reducer(previousStateForKey, action)
        changedState[ key ] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      return hasChanged ? { ...state, ...changedState } : state
    }
  }
}

class ArrayScheme extends Scheme {
  constructor (name, struct, actMap) {
    super(name, struct, actMap)

    const value = this.struct[ 0 ]
    const isScheme = value instanceof Scheme
    const acceptNameSet = new Set()
    acceptNameSet.add(this.name)

    this.initialState = []
    this.acceptNameSet = acceptNameSet
    this.structReducer = isScheme ? ArrayScheme.getStructReducer(value) : DEFAULT_REDUCER
    this.actionReducer = this.getActionReducer()
    this.reducer = this.getReducer()
  }

  toStructJSON () { return this.struct.map(toStructJSONWithCheck) }

  static getStructReducer (scheme) {
    return (arrayState, action) => {
      let hasChanged = false
      let nextArrayState = null

      function reduceItem (state, action, index) { // payload as item-action
        const nextState = scheme.reducer(state, action)
        if (state === nextState) return
        if (!hasChanged) nextArrayState = [ ...arrayState ]
        nextArrayState[ index ] = nextState
        hasChanged = true
      }

      if (action.index !== undefined) {
        reduceItem(arrayState[ action.index ], action.payload, action.index)
      } else if (action.filter !== undefined) {
        const filter = ArrayScheme.getFilter(action.filter)
        filter && arrayState.forEach((state, index) => filter(state, index) && reduceItem(state, action.payload, index))
      }
      return hasChanged ? nextArrayState : arrayState
    }
  }

  static getFilter (filter) {
    switch (filter.type) {
      case 'key-value': {
        const { key, value } = filter
        return (state, index) => (state[ key ] === value)
      }
    }
    return null
  }
}

export {
  Scheme,
  ObjectScheme,
  ArrayScheme
}
