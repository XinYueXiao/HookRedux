import * as React from 'react'
import HooksRedux from './HooksRedux'
import './index.css'
const {
    Provider,
    store
} = HooksRedux({
    initialState: { name: '微微', age: 0 }
})
const Home = () => {
    const state = store.useContext()
    return (
        < div className='hook-box'>
            <p>Hook的reducer组件</p>
            <p>Age: {state.age}</p>
            <Button />
        </div >
    )
}
//同步请求
const actionOfAdd = () => {
    return {
        type: 'addCount',
        reducer(state) {
            return {
                ...state,
                age: state.age + 1
            }
        }
    }
}
function timeOutAdd(a) {
    return new Promise(cb => setTimeout(() => cb(a - 1), 500))
}
//异步请求
const actionAsyncOfDelete = () => async (dispatch, ownState) => {
    const age = await timeOutAdd(ownState.age)
    dispatch({
        type: 'addCount',
        reducer(state) {
            return {
                ...state,
                age
            }
        }
    })
}
//出发请求
const Button = () => {
    function handleAdd() {
        //返回给dispacth的是一个对象
        store.dispatch(actionOfAdd())
    }
    function handleAsyncDelete() {
        //返回给dispacth的是一个对象
        store.dispatch(actionAsyncOfDelete())
    }
    return <>
        <button className='button blue' onClick={handleAdd} >点击增加Age</button>
        <button className='button orange' onClick={handleAsyncDelete} >点击异步减少Age</button>
    </>
}
const WarpHome = () => {

    return (
        <Provider>
            <Home />
        </Provider>
    )
}
export default WarpHome