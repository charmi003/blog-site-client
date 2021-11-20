import axios from 'axios'
import { REMOVE_USER_FROM_STATE, SET_USERS } from './adminTypes';

export const fetchUsers=()=>{
    return (dispatch)=>{
        axios.get('https://blog-site-server.vercel.app/admin/all-users',{
            'headers':{
                'x-access-token':window.localStorage.token
            }
        }).then((response)=>{
            dispatch({ type:SET_USERS, payload:response.data.users });

        }).catch((err)=>{
            console.log(err);
        })
    }
}


export const deleteUser=(userId,alert)=>{
    return (dispatch)=>{
        axios.get(`https://blog-site-server.vercel.app/admin/delete-user/${userId}`,{
            'headers':{
                'x-access-token':window.localStorage.token
            }
        }).then((response)=>{
            dispatch({ type:REMOVE_USER_FROM_STATE, payload:userId});
            alert.show('User deleted!',{ type:'success' });
        }).catch((err)=>{
            console.log(err);
            alert.show('Something went wrong!',{ type:'error' })
        })
    }

}


export const addContentWriter=(data,alert,setUsername,setPassword)=>{
    return (dispatch)=>{
        let dataObj={
            ...data,
            role:'content-writer'
        }
        const config={
            'headers':{
                'content-type':'application/JSON',
                'x-access-token':window.localStorage.token
            }
        }
        axios.post('https://blog-site-server.vercel.app/admin/add-content-writer',JSON.stringify(dataObj),config).then((response)=>{
            if(!response.data.user){
                alert.show(response.data.message,{ type:'error' });
                document.querySelector('.signup-form-btn').disabled=false;
            }
            else{
                alert.show('Content writer added!',{ type:'success' })
                document.querySelector('.signup-form-btn').disabled=false;
                setUsername("");
                setPassword("");
            }
        }).catch((err)=>{
            console.log(err);
            document.querySelector('.signup-form-btn').disabled=false;
            alert.show("Something went wrong!", { type:"error" });
        })
    }

}


