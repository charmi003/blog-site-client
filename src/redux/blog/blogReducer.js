import { SET_APPROVED_BLOGS, SET_BLOGS, SET_MY_BLOGS, REMOVE_BLOG_FROM_STATE, APPROVE_BLOG_IN_STATE, ADD_CREATED_BLOG_IN_STATE } from "./blogTypes"

const initialState={
    blogs:[],
    approvedBlogs:[],
    myBlogs:[]
}

const blogReducer=(currState=initialState,action)=>{
    switch(action.type){
        case SET_BLOGS:
            return{
                ...currState,
                blogs:action.payload
            }
        case SET_APPROVED_BLOGS:
            return{
                ...currState,
                approvedBlogs:action.payload
            }
        case SET_MY_BLOGS:
            return{
                ...currState,
                myBlogs:action.payload
            }
        case ADD_CREATED_BLOG_IN_STATE:
            return{
                ...currState,
                blogs:[action.payload,...currState.blogs]
            }
        case REMOVE_BLOG_FROM_STATE:
            return{
                ...currState,
                blogs:currState.blogs.filter((b)=>b._id!==action.payload)
            }
        case APPROVE_BLOG_IN_STATE:
            let idx=currState.blogs.findIndex((b)=>b._id===action.payload);
            currState.blogs[idx].isApproved=true;
            return {
                ...currState,
                blogs:[...currState.blogs]
            }
        default:
            return currState
    }
}

export default blogReducer