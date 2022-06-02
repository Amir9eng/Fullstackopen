import React from 'react'

const BlogForm = ({onSubmit, newTitle, newAuthor, newUrl, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <p>Create New</p>
      <div> 
      Title: <input type="text" value={newTitle} onChange={handleTitleChange}  />
      </div>
      <div>
      Author: <input type="text" name='author' value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
      Url: <input type="text" name='url' value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm
