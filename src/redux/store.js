import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import authReducer from './auth/authReducer'
import blogReducer from './blog/blogReducer'
import adminReducer from './admin/adminReducer'


const rootReducer=combineReducers({
    auth:authReducer,
    blog:blogReducer,
    admin:adminReducer
})

const store=createStore(
    rootReducer,
    compose(
       applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f   
      )
)

export default store

//thunk
//used to run async code
//now our action creator instead of an object can return a fn
//generally, action creator --> returns an action object and the action is dispatched

//action creator 
// const createProject=(project)=>{
//     return (dispatch,getState)=>{
        //make async call  (halt the dispatch)
//         dispatch({});  //resuming the dispatch
//     }
// }


