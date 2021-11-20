import React, { useEffect } from 'react'
import ContentWriterForm from './ContentWriterForm'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { approveBlog, deleteBlog } from '../redux' 

const AdminDashboard = () => {
    const navigate=useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch();

    const blogs=useSelector( state=> state.blog.blogs );
    let unapprovedBlogs=[];
    if(blogs){
        unapprovedBlogs=blogs.filter((b)=>b.isApproved==false);
    }

    let blogsList=unapprovedBlogs.map((blog)=>
            <tr key={blog._id}>
                <td><Link to={ "/blog/"+ blog._id } key={blog._id}>{blog._id}</Link></td>
                <td>{blog.title}</td>
                <td>{blog.author.username}</td>
                <td><button className="btn pink lighten-1 z-depth-0" onClick={()=>dispatch(approveBlog(blog._id,alert))}>Approve</button></td>
                <td><i className="fas fa-trash-alt cursor-pointer" onClick={()=>dispatch(deleteBlog(blog._id,alert))}></i></td>
            </tr>
    )

    const isLoggedIn=useSelector( state => state.auth.isLoggedIn );
    const user=useSelector( state => state.auth.user );
    if(!isLoggedIn || (user &&  user.role!=="admin"))
        navigate('/');

    return (
        <div className='flex flex-wrap justify-between'>
            <div className='w-full md:w-1/4 mx-auto'>
                <ContentWriterForm />
            </div>
            <table className="w-full md:w-2/3 mx-6 my-4 responsive-table ">
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
            
        </div>
    )
}

export default AdminDashboard
