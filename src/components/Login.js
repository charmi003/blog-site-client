import React,{ useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../redux';
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'  //v6-->useHistory replaced by useNavigate

const Login = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        document.querySelector('.login-btn').disabled=true;
        let data={
            username,
            password
        }
        dispatch(login(data,alert,navigate));
    }   

    return (
        <form action="" className="white w-full md:w-1/2 mx-auto border-2 my-8 p-4" onSubmit={submitHandler}>
            <div className="input-field">
                <label htmlFor="username">username</label>
                <input className="border" type="text" name="username" required value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input className="border" type="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
           
           <button type="submit" className="login-btn btn pink lighten-1 z-depth-0 transform scale-100 hover:scale-110">Login</button>
        </form>
    )
}

export default Login
