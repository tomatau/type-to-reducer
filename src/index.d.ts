interface reducerMapFunction<S, A> {
  (state: S, action: A): S
}

interface reducerMap<S, A> {
  [key: string]: reducerMap<S, A> | reducerMapFunction<S, A>
}

declare module 'type-to-reducer' {
  export default function typeToReducer<S = any, A = any> (
    reducerMap: reducerMap<S, A>,
    initialState: S
  ): reducerMapFunction<S, A>
}
