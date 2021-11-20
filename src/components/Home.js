import React from 'react'
import { useSelector } from 'react-redux'
import BlogSummary from './BlogSummary';
import { Link } from 'react-router-dom'

const Home = () => {

    const blogs=useSelector( state=> state.blog.approvedBlogs );
    
    return (
        <div className="dashboard">
            <div className="w-5/6 mx-auto mt-4">
            {
              blogs.length ? blogs.map((blog)=>
                <Link to={ "/blog/"+ blog._id } key={blog._id}>
                    <BlogSummary  blog={blog} />
                </Link>
              )
              : null
            }     
            </div>
        </div>
    )
}

export default Home
