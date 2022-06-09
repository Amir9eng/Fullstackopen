import React, { useState } from 'react'

const BlogForm = ({createBlog}) => {
  
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
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
     createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <p>Create New</p>
      <div> 
      Title: <input type="text" placeholder='title' value={newTitle} onChange={handleTitleChange}  />
      </div>
      <div>
      Author: <input type="text" placeholder='author' name='author' value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
      Url: <input type="text" placeholder='url' name='url' value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm
