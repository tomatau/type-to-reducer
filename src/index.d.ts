interface reducerMapFunction {
  (state: any, action: any): any
}

interface reducerMap {
  [key: string]: reducerMap | reducerMapFunction
}

declare module 'type-to-reducer' {
  export default function typeToReducer (
      reducerMap: reducerMap,
      initialState: any
  ): reducerMapFunction
}
