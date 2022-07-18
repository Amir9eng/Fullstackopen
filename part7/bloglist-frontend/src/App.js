import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch()
  // const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs)
  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.user)
  // const [message, setMessage] = useState(null)
  const message = useSelector(state => state.message)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  
  useEffect(() => {
    dispatch(initializeBlogs())}, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user.token)
    }
  }, [])

  // const handleLogin = async (username, password) => {
  //   console.log('login calledddd', username, password)
  //   try {
  //     const user = await loginService.login({
  //       username,
  //       password
  //     })
  //     console.log({ user })
  //     window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  //     blogService.setToken(user.token)
  //     setUser(user)
  //     setMessage({
  //       text: `Welcome ${user.name}`,
  //       type: 'success'
  //     })
  //   } catch (error) {
  //     setMessage({
  //       text: `wrong username or password`,
  //       type: 'error'
  //     })
  //   }
  // }

  const handleBlogForm = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title,
        author,
        url
      })
      setMessage({
        text: `A new blog ${title} by ${author} added`,
        type: 'success'
      })
      const user = blogService.getUserInfo()
      setBlogs(blogs.concat({ ...blog, user }))
    } catch (error) {
      setMessage({
        text: `A new blog ${title} by ${author} NOT added`,
        type: 'error'
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateBlog = async blog => {
    try {
      await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      })
      setMessage({
        text: `blog ${blog.title} by ${blog.author} was liked`,
        type: 'success'
      })
      const newBlogs = blogs.map(currentBlog =>
        currentBlog.id === blog.id
          ? { ...currentBlog, likes: currentBlog.likes + 1 }
          : currentBlog
      )
      setBlogs(newBlogs)
    } catch (error) {
      setMessage({
        text: `A new like to blog ${blog.title} by ${blog.author} is NOT added`,
        type: 'error'
      })
    }
  }

  const deleteBlog = async blog => {
    try {
      await blogService.deleteBlog(blog.id)
      setMessage({
        text: `Blog ${blog.title} by ${blog.author} deleted`,
        type: 'success'
      })
      const newBlogs = blogs.filter(currentBlog => currentBlog.id !== blog.id)
      setBlogs(newBlogs)
    } catch (error) {
      setMessage({
        text: `Blog ${blog.title} by ${blog.author} NOT deleted`,
        type: 'error'
      })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name}
            logged in <button onClick={handleLogout}> Logout </button>{' '}
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <h2> create new </h2>
            <BlogForm handleBlogForm={handleBlogForm} />
          </Togglable>
          <hr></hr>
          <div>
            {' '}
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                />
              ))}
          </div>
          )
        </div>
      )}
    </div>
  )
}

export default App
