// internal state
let typeDelimiter = '_'

// change the string separating action types when reducerMap is nested
export const setTypeDelimiter = customTypeDelimiter => typeDelimiter = customTypeDelimiter

// function to concatenate any nested types
const _makeType = (prefix, type) => prefix.concat(type).join(typeDelimiter)

// iterator function that will read the reducerMap and return a flattened object
const _flattenReducerMap = (reducers, initial={}, prefix=[]) => {
  const reducerTypes = Object.keys(reducers || {})
  return reducerTypes.reduce((acc, type) => {
    const reducer = reducers[type]
    return typeof(reducer) === 'function'
      ? { ...acc, [_makeType(prefix, type)]: reducer }
      : _flattenReducerMap(reducer, acc, [ _makeType(prefix, type) ])
  }, initial)
}

export default function typeToReducer(reducerMap, initialState) {
  const flattened = _flattenReducerMap(reducerMap)

  return (state=initialState, action) => {
    const reducer = flattened[action.type]
    return reducer ? reducer(state, action) : state
  }
}
