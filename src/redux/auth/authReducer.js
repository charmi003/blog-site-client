import { SET_LOGIN_STATUS, SET_USER } from "./authTypes"

const initialState={
    isLoggedIn:false,
    user:null
}

const authReducer=(currState=initialState,action)=>{
    switch(action.type){
        case SET_LOGIN_STATUS:
            return {
                ...currState,
                isLoggedIn:action.payload
            }
        case SET_USER:
            return {
                ...currState,
                user:action.payload
            }
        default:
            return currState
    }
}

export default authReducer