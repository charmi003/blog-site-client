import React from 'react'
import moment from 'moment'


const BlogSummary = ({blog,approved}) => {
    return (
        <div className="card z-depth-1 project-summary hoverable">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{blog.title}</span>
                <p> Posted by {blog.author.username} </p>
                <p className="grey-text">{blog.createdAt && moment(blog.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
            </div>
            { approved ? approved : null}
        </div>
    )
}

export default BlogSummary