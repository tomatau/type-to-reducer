[![Circle CI](https://circleci.com/gh/tomatau/type-to-reducer/tree/master.svg?style=svg)](https://circleci.com/gh/tomatau/type-to-reducer/tree/master)

# type-to-reducer

Create reducer functions based on an object keyed by action types

## Why?

Pretty much the same as the `handleActions` function in https://github.com/acdlite/redux-actions

Differences being that this only exposes the one function and allows nesting - API suggested by https://github.com/pburtchaell/redux-promise-middleware/issues/35#issuecomment-164650859

## Usage

`npm install type-to-reducer --save`

```js
import { typeToReducer } from 'type-to-reducer'
import { GET, UPDATE } from 'app/actions/foo'

const initialState = {
  data: null,
  isPending: false,
  error: false
}

export const reducer = typeToReducer({
  [GET]: (state, action) => ({
    ...state,
    data: getFoo(action)
  }),
  [UPDATE]: (state, action) => ({
    ...state,
    data: getFoo(action)
  })
}, initialState)
```

Can also be used to group reducers by prefix.

```js
import { typeToReducer } from 'type-to-reducer'
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
