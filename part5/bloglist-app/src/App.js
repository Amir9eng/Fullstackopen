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
      blogService.create(BlogToAdd)
      setSuccessMessage(`Blog ${BlogToAdd.title} was succesfully added`)
      getAllBlogs()
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
  console.log(user);

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
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
