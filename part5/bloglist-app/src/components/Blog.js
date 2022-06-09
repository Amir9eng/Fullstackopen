import { useState } from 'react';
import { PropTypes } from 'prop-types';

const Blog = (props) => {
    const blog = props.blog
    const [blogObject, setBlogObject] = useState(blog)
    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible ? "" : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }
    const buttonLabel = visible ? 'hide' : 'view'

    const increaseLikes = () => {
      const updatedBlog = ({
        ...blog,
        likes: blog.likes + 1
      })
      props.updateBlog(updatedBlog)
      setBlogObject(updatedBlog)
    }
    const deleteBlog = () => props.removeBlog(blog)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return ( 
    <div style= { blogStyle } className= 'blog'>
        <div> 
          { blog.title } - { blog.author } <button onClick={toggleVisibility}>{buttonLabel}</button>
         </div> 
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>{blogObject.likes} <button onClick={increaseLikes}>like</button></p>
          <button onClick={deleteBlog}>delete</button>
        </div>
    </div>
    )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog