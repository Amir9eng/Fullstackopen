import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from '../../bloglist-app/src/services/blogs'
import loginService from '../../bloglist-app/src/services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

function App () {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
  const handleUrlChange = e => {
    setNewUrl(e.target.value)
  }
  const handleAuthorChange = e => {
    setNewAuthor(e.target.value)
  }
  const handleTitleChange = e => {
    setNewTitle(e.target.value)
  }

  const addBlog = async e => {
    e.preventDefault()
    const BlogToAdd = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.create(BlogToAdd)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setSuccessMessage(`Blog ${BlogToAdd.title} was successfully added `)
      getAllBlogs()
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Cannot add blog ${BlogToAdd.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
          <BlogForm
            onSubmit={addBlog}
            newTitle={title}
            handleTitleChange={handleTitleChange}
            newAuthor={author}
            handleAuthorChange={handleAuthorChange}
            newUrl={url}
            handleUrlChange={handleUrlChange}
          />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
