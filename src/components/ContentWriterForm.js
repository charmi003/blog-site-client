import React,{  useState } from 'react'
import { useDispatch } from 'react-redux'
import { addContentWriter } from '../redux';
import { useAlert } from 'react-alert';

const ContentWriterForm = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        document.querySelector('.signup-form-btn').disabled=true;
        let data={
            username,
            password
        }
        dispatch(addContentWriter(data,alert,setUsername,setPassword));
    }   

    return (
        <form action="" className="white mx-auto border-2 my-8 p-4" onSubmit={submitHandler}>
            <div className="input-field">
                <label htmlFor="username">username</label>
                <input className="border" type="text" name="username" required value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input className="border" type="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
           
           <button type="submit" className="signup-form-btn btn pink lighten-1 z-depth-0 transform scale-100 hover:scale-110">Add Writer</button>
        </form>
    )
}

export default ContentWriterForm
