
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen  } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title:"JavaScript patterns",
    author:"Amir Mukhtar",
    url:"https://reactpatterns.com/",
    likes:7
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const view = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )
    expect(view.container).toHaveTextContent(
      'JavaScript patterns - Amir Mukhtar'
    )
  })

  test('clicking the view button displays url and number of likes', () => {
    const utils = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} removeBlog={mockDeleteBlog} />
    )

    const button = screen.getByText('view')
    fireEvent.click(button)

    expect(utils.container).toHaveTextContent(
      'https://reactpatterns.com/'
    )

    expect(utils.container).toHaveTextContent(
      '7'
    )
  })
})
    
    
 