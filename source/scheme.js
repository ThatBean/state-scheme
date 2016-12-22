import Operation from './operation'

const methodCheck = (target, name) => target instanceof Object && name in target

const DEFAULT_REDUCER = (state, action) => {
  console.error('DEFAULT_REDUCER', state, action)
  return state
}

class Scheme {
  constructor (name, struct, actionMap) {
    this.name = name
    this.struct = struct
    this.actionMap = actionMap
    this.initialState = null
    this.acceptNameSet = null
    this.structReducer = null
    this.actionReducer = null
    this.reducer = null
  }

  getActionReducer () {
    const { actionMap } = this
    return (state, { type, payload }) => {
      const actionReducer = actionMap[ type ]
      if (actionReducer) return actionReducer(state, payload) // processed
      return state
    }
  }

  getReducer () {
    const { name, initialState, acceptNameSet, actionReducer, structReducer } = this
    return (state = initialState, action) => {
      if (!acceptNameSet.has(action.name)) return state // filtered by accept name
      if (action.name === name) return actionReducer(state, action) // process here
      return structReducer(state, action) // pass down
    }
  }

  toStructJSON () {
    return methodCheck(this.struct, 'toStructJSON') ? this.struct.toStructJSON() : this.struct
  }
}

class MapScheme extends Scheme {
  constructor (name, struct, actionMap) {
    super(name, struct, actionMap)

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
        Operation.setAssign(acceptNameSet, value.acceptNameSet)
        schemeKeyList.push(key)
      }
    }

    this.initialState = initialState
    this.acceptNameSet = acceptNameSet
    this.structReducer = MapScheme.getMapSchemeReducer(schemeKeyList, this.struct)
    this.actionReducer = this.getActionReducer()
    this.reducer = this.getReducer()
  }

  toStructJSON () {
    return Operation.mapMap(this.struct, (value) => methodCheck(value, 'toStructJSON') ? value.toStructJSON() : value)
  }

  static getMapSchemeReducer (schemeKeyList, schemeMap) {
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

class ListScheme extends Scheme {
  constructor (name, struct, actionMap) {
    super(name, struct, actionMap)

    const value = this.struct[ 0 ]
    const isScheme = value instanceof Scheme
    const acceptNameSet = new Set()
    acceptNameSet.add(this.name)

    this.initialState = []
    this.acceptNameSet = isScheme ? Operation.setAssign(acceptNameSet, value.acceptNameSet) : acceptNameSet
    this.structReducer = isScheme ? ListScheme.getListSchemeReducer(value) : DEFAULT_REDUCER
    this.actionReducer = this.getActionReducer()
    this.reducer = this.getReducer()
  }

  toStructJSON () {
    return this.struct.map((value) => methodCheck(value, 'toStructJSON') ? value.toStructJSON() : value)
  }

  static getListSchemeReducer (scheme) {
    return (listState, action) => {
      let hasChanged = false
      let nextListState = null

      function reduceItem (state, action, index) { // payload as item-action
        const nextState = scheme.reducer(state, action)
        if (state === nextState) return
        if (!hasChanged) nextListState = [ ...listState ]
        nextListState[ index ] = nextState
        hasChanged = true
      }

      if (action.index !== undefined) {
        reduceItem(listState[ action.index ], action.payload, action.index)
      } else if (action.filter !== undefined) {
        const filter = ListScheme.getFilter(action.filter)
        filter && listState.forEach((state, index) => filter(state, index) && reduceItem(state, action.payload, index))
      }
      return hasChanged ? nextListState : listState
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
  MapScheme,
  ListScheme
}
