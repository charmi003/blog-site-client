import {  REMOVE_USER_FROM_STATE, SET_USERS } from "./adminTypes"

const initialState={
    users:[]
}

const adminReducer=(currState=initialState,action)=>{
    switch(action.type){
        case SET_USERS:
            return{
                ...currState,
                users:action.payload
            }
        case REMOVE_USER_FROM_STATE:
            return{
                ...currState,
                users:currState.users.filter((u)=>u._id!==action.payload)
            }
        default:return currState
    }
    
}


export default adminReducer