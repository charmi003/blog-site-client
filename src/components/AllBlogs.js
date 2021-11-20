import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { deleteBlog, approveBlog } from '../redux';

const AllBlogs = () => {
    const navigate=useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch();

    const blogs=useSelector( state=> state.blog.blogs );
    let blogsList=blogs.map((blog)=>
        <tr key={blog._id}>
            <td><Link to={ "/blog/"+ blog._id } key={blog._id}>{blog._id}</Link></td>
            <td>{blog.title}</td>
            <td>{blog.author.username}</td>
                {
                    blog.isApproved ? <td className='text-green-500'>Approved</td> : 
                    <td><button className="btn pink lighten-1 z-depth-0" onClick={()=>dispatch(approveBlog(blog._id,alert))}>Approve</button></td>
                }
            <td><i className="fas fa-trash-alt cursor-pointer" onClick={()=>dispatch(deleteBlog(blog._id,alert))}></i></td>
        </tr>
    )

    const isLoggedIn=useSelector( state => state.auth.isLoggedIn );
    const user=useSelector( state => state.auth.user );
    if(!isLoggedIn || (user && user.role!=="admin"))
        navigate('/');

    return (
        <table className="mx-6 my-4 responsive-table">
            <thead>
                <tr>
                    <th>Blog Id</th>
                    <th>Blog Title</th>
                    <th>Created By</th>
                    <th>Approve</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                blogsList
            }  
            </tbody>
        </table> 
    )
}

export default AllBlogs
