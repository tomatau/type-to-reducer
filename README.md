[![Circle CI](https://circleci.com/gh/tomatau/type-to-reducer/tree/master.svg?style=svg)](https://circleci.com/gh/tomatau/type-to-reducer/tree/master)

# type-to-reducer

[![Greenkeeper badge](https://badges.greenkeeper.io/tomatau/type-to-reducer.svg)](https://greenkeeper.io/)

Create reducer functions based on an object keyed by action types

## Why?

Pretty much the same as the `handleActions` function in https://github.com/acdlite/redux-actions

Differences being that this only exposes the one function and allows nesting - API suggested by https://github.com/pburtchaell/redux-promise-middleware/issues/35#issuecomment-164650859

## Usage

`npm install type-to-reducer --save`

```js
import typeToReducer from 'type-to-reducer'
import { GET, UPDATE } from 'app/actions/foo'

const initialState = {
  data: null,
  isPending: false,
  error: false
}

export const reducer = typeToReducer({
  [GET]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [UPDATE]: (state, action) => ({
    ...state,
    data: action.payload
  })
}, initialState)
```

Can also be used to group reducers by prefix.

```js
import typeToReducer from 'type-to-reducer'
import { API_FETCH } from 'app/actions/bar'

const initialState = {
  data: null,
  isPending: false,
  error: false
}

export const reducer = typeToReducer({
  [ API_FETCH ]: {
    PENDING: () => ({
      ...initialState,
      isPending: true
    }),
    REJECTED: (state, action) => ({
      ...initialState,
      error: action.payload,
    }),
    FULFILLED: (state, action) => ({
      ...initialState,
      data: action.payload
    })
  }
}, initialState)
```

## Custom Type Delimiter

You can add a custom type delimiter instead of the default `'_'`.

This will set it for every reducer you create after the custom delimiter is set, yes a dirty stateful function. This is for convenience so you can set it for your whole project up front and not to pollute the main function abstraction for rare settings.

```js
import typeToReducer, {setTypeDelimiter} from 'type-to-reducer'
import { API_FETCH } from 'app/actions/bar'

const initialState = {
  data: null,
  isPending: false,
}

setTypeDelimiter('@_@')

export const reducer = typeToReducer({
  [ API_FETCH ]: {
    PENDING: () => ({
      ...initialState,
      isPending: true
    }),
  }
}, initialState)

// Then use the delimiter in your action type
reducer(someState, {
  type: API_FETCH + '@_@' + 'PENDING'
})
```

This function may change to something that will scale better such as `setOptions(options)` to support more settings if more pop up.
