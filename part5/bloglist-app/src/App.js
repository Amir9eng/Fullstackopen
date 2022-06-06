import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from '../../bloglist-app/src/services/blogs'
import loginService from '../../bloglist-app/src/services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App () {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  
  const blogFormRef = React.useRef(null)

  // useEffect(() => {
  //   blogService.getAll().then(blogs => setBlogs(blogs))
  // }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])
  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (a.likes > b.likes) ? -1 :1)
    setBlogs(blogs)
  }

  const handleLogin = async e => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = e => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  } 
  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(BlogToAdd)
      setSuccessMessage(`Blog ${BlogToAdd.title} was succesfully added`)
      setBlogs(blogs.concat(createdBlog))
      // getAllBlogs()
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
    } catch (exception) {
      setErrorMessage(`Cannot add Blog ${BlogToAdd.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }
  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate)
      setSuccessMessage(`Blog ${BlogToUpdate.title} was successfully updated`)
      setBlogs(blogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
    } catch (exception) {
      setErrorMessage(`Cannot update blog ${BlogToUpdate.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
 }
 
  const removeBlog = async (BlogToDelete) => {
    try {
      if(window.confirm(`Delete ${BlogToDelete.title} ? `)){
        blogService.remove(BlogToDelete.id)
        setSuccessMessage(`Blog ${BlogToDelete.title} was successfully deleted`)
        setBlogs(blogs.filter(blog =>  blog.id !== BlogToDelete.id))
        setErrorMessage(null)
        setTimeout(() => {
         setSuccessMessage(null)
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage(`Cannot delete blog ${BlogToDelete.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }
  return (
    <div>
      <h2> blogs </h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {user === null ? (
        <>
          <LoginForm
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            handleLogin={handleLogin}
          /> 
        </>
      ) : (
        <div>
          <h1>Add new Blog</h1>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
         </Togglable>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
