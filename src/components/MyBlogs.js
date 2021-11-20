import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import BlogSummary from './BlogSummary';
import { Link } from 'react-router-dom'
import { fetchMyBlogs } from '../redux';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const isLoggedIn=useSelector( state => state.auth.isLoggedIn );
    const user=useSelector( state => state.auth.user );

    useEffect(()=>{
         user && dispatch(fetchMyBlogs());
    },[user])

    const blogs=useSelector( state=> state.blog.myBlogs );

    if(!isLoggedIn || (user && user.role!=="content-writer"))
        navigate('/');
    
    return (
            <div className="w-5/6 mx-auto mt-4">
            {
              blogs && blogs.length ? blogs.map((blog)=>
                <div className="relative" key={blog._id}>
                    <Link to={ "/blog/"+ blog._id }>
                        <BlogSummary  blog={blog} />
                    </Link>
                    {blog.isApproved ? <span className="absolute top-5 right-5 text-green-500">Approved</span> :
                     <span className="absolute top-5 right-5 text-red-500">Not Approved</span>
                     }
                </div>
              )
              : null
            }     
            </div>
    )
}

export default MyBlogs
