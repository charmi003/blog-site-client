import { SET_LOGIN_STATUS, SET_USER } from "./authTypes"
import axios from 'axios';


export const fetchLoginStatus=()=>{
    return (dispatch)=>{
        axios.defaults.withCredentials=true;
        axios.get("https://blog-site-server.vercel.app/auth/login-status").then((response)=>{
            dispatch(setLoginStatus(response.data.isLoggedIn));
            dispatch(setUser(response.data.user));
        }).catch((err)=>{
            console.log(err)
        })
    }
}


export const setLoginStatus=(isLoggedIn)=>{
    return {type:SET_LOGIN_STATUS, payload:isLoggedIn }; 
}

export const setUser=(user)=>{
    return { type:SET_USER, payload:user }
}

export const login=(data,alert,navigate)=>{

    return (dispatch)=>{
        const config={
            'headers':{
                'content-type':'application/JSON'
            }
        }
        axios.post('https://blog-site-server.vercel.app/auth/login',JSON.stringify(data),config).then((response)=>{
            if(response.data.user){
                dispatch(setLoginStatus(true));
                dispatch(setUser(response.data.user));
                window.localStorage.token=response.data.token; //storing the jwt token inside local storage
                alert.show("Logged in!",{ type:"success" });
                navigate("/");
            }
            else
            {
                document.querySelector('.login-btn').disabled=false;
                alert.show(response.data.message,{ type:"error" });
            }
        }).catch((err)=>{
            document.querySelector('.login-btn').disabled=false;
            console.log(err);
            alert.show("Something went wrong!", { type:"error" });
        })
    }
}



export const logout=(alert,navigate)=>{
    return (dispatch)=>{
        axios.get('https://blog-site-server.vercel.app/auth/logout').then((response)=>{
            dispatch(setLoginStatus(false));
            dispatch(setUser(null));
            alert.show("Logged out!",{ type:"success" });
            navigate("/");

        }).catch((err)=>{
            console.log(err);
            alert.show("Something went wrong!", { type:"error" });
        })
    }
}