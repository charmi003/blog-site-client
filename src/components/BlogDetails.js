import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux';
import moment from 'moment'


const BlogDetails = () => {

    const params=useParams();

    const blogId=params.id;
    const blogs=useSelector( state=> state.blog.blogs);
    const blog=blogs.find( (b)=> b._id===blogId );
    
    return (blog ? 

        <div className="container section project-details">

            <div className="card z-depth-4">
                <div className="card-content">
                    <span className="card-title">{blog.title}</span>
                    <p>{blog.content}</p>
                </div>

                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {blog.author.username} </div>
                    <div>{moment(blog.createdAt).format('MMMM Do YYYY, h:mm a')}</div>
                </div>
            </div>


        </div>
        : null
    )
}

export default BlogDetails
