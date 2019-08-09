import * as React from 'react'
const { useContext, useReducer, createContext } = React
//核心-->一定要返回状态
function reducerInAction(state, action) {
    if (typeof action.reducer == 'function') {
        return action.reducer(state)
    }
    return state
}
//公用的数据处理
export default function createStore(params) {
    const { initialState = {}, reducer
    } = {
        ...params,
        reducer: reducerInAction
    }
    //实际是由createContext所有状态版本的管理
    const Appcontext = createContext()
    const middleWareReducer = (lastState, action) => {
        //更新数据
        let netxState = reducer(lastState, action)
        store._state = netxState
        return netxState
    }
    const store = {
        _state: initialState,
        dispatch: undefined,
        getState: () => {
            return store._state
        },
        useContext: () => {
            return useContext(Appcontext)
        }
    }
    //数据包裹返回
    const Provider = props => {
        const [state, dispatch] = useReducer(middleWareReducer, initialState)
        if (!store.dispatch) {
            store.dispatch = async (action) => {
                if (typeof action === 'function') {
                    await action(dispatch, store.getState())
                } else {
                    dispatch(action)
                }

            }
        }
        return <Appcontext.Provider {...props} value={state} />
    }

    return {
        Provider,
        store
    }
}
