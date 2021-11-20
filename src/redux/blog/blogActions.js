import axios from 'axios'
import { SET_APPROVED_BLOGS, SET_BLOGS, SET_MY_BLOGS, REMOVE_BLOG_FROM_STATE, APPROVE_BLOG_IN_STATE, ADD_CREATED_BLOG_IN_STATE } from './blogTypes'

export const createBlog=(data,alert,navigate)=>{
    return (dispatch,getState)=>{
        const config={
            'headers':{
                'content-type':'application/JSON',
                'x-access-token':window.localStorage.token
            }
        }

        let dataObj={
            ...data,
            author:getState().auth.user._id,
            isApproved:false
        }
    
        axios.post('https://blog-site-server.vercel.app/blogs/create',JSON.stringify(dataObj),config).then((response)=>{
            if(response.data.blog){
                dispatch({ type:ADD_CREATED_BLOG_IN_STATE, payload:response.data.blog })
                alert.show("Blog created!",{ type:"success" });
                navigate("/my-blogs");
            }
            else
            {
                document.querySelector('.blog-form-btn').disabled=false;
                alert.show(response.data.message,{ type:"error" });
            }
           
        }).catch((err)=>{
            console.log(err);
            alert.show("Something went wrong!", { type:"error" });
        })
    }


}




export const fetchBlogs=()=>{
    return (dispatch)=>{
        axios.get('https://blog-site-server.vercel.app/blogs/all-blogs').then((response)=>{
            dispatch({ type:SET_BLOGS, payload:response.data.blogs });
            let approved_blogs=response.data.blogs.filter((b)=>b.isApproved===true);
            dispatch({ type:SET_APPROVED_BLOGS, payload:approved_blogs });

        }).catch((err)=>{
            console.log(err);
        })
    }
} 


export const fetchMyBlogs=()=>{
    return (dispatch,getState)=>{
            axios.get(`https://blog-site-server.vercel.app/blogs/my-blogs/${getState().auth.user._id}`,{
                'headers':{
                    'x-access-token':window.localStorage.token
                }
            }).then((response)=>{
            let blogs=response.data.blogs.reverse();
            dispatch({ type:SET_MY_BLOGS, payload:blogs });

            }).catch((err)=>{
                console.log(err);
            })
    }
    
}


export const deleteBlog=(blogId,alert)=>{
    return (dispatch)=>{
        axios.get(`https://blog-site-server.vercel.app/admin/delete-blog/${blogId}`,{
            'headers':{
                'x-access-token':window.localStorage.token
            }
        }).then((response)=>{
            dispatch({ type:REMOVE_BLOG_FROM_STATE, payload:blogId});
            alert.show('Blog deleted!',{ type:'success' });
        }).catch((err)=>{
            console.log(err);
            alert.show('Something went wrong!',{ type:'error' })
        })
    }

}


export const approveBlog=(blogId,alert)=>{
    return (dispatch)=>{
        axios.get(`https://blog-site-server.vercel.app/admin/approve-blog/${blogId}`,{
            'headers':{
                'x-access-token':window.localStorage.token
            }
        }).then((response)=>{
            dispatch({ type:APPROVE_BLOG_IN_STATE, payload:blogId});
            alert.show('Blog approved!',{ type:'success' });
        }).catch((err)=>{
            console.log(err);
            alert.show('Something went wrong!',{ type:'error' })
        })
    }
}