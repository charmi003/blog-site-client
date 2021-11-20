import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'  //v6-->useHistory replaced by useNavigate
import { createBlog } from '../redux'

const BlogForm = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        document.querySelector('.blog-form-btn').disabled=true;
        let data={
            title,
            content
        }
        dispatch(createBlog(data,alert,navigate));
    }   

    const isLoggedIn=useSelector( state => state.auth.isLoggedIn );
    const user=useSelector( state => state.auth.user );
    if(!isLoggedIn || (user && user.role!=="content-writer"))
        navigate('/');

    return (
        <form action="" className="white w-full md:w-1/2 mx-auto border-2 my-8 p-4" onSubmit={submitHandler}>
             <div className="input-field">
                <label htmlFor="username">Title</label>
                <input className="border" type="text" name="title" required value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="input-field">
                <label htmlFor="content">Content</label>
                <textarea className="materialize-textarea" name="content" required value={content} onChange={(e)=>setContent(e.target.value)}></textarea> 
            </div>
           <button type="submit" className="blog-form-btn btn pink lighten-1 z-depth-0 transform scale-100 hover:scale-110">Create</button>
        </form>
    )
}

export default BlogForm
