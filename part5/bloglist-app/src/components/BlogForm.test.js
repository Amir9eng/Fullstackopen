import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'



test('<BlogForm /> updates parent state and calls onSubmit', async() => {
    const createBlog = jest.fn()
    const user = userEvent.setup()


    render( <
        BlogForm createBlog = { createBlog }
        />
    )

    const input = screen.getByPlaceholderText('title')
    const input1 = screen.getByPlaceholderText('author')
    const input2 = screen.getByPlaceholderText('url')
    const send = screen.getByText('Create')
    await user.type(input, 'Blog title')
    await user.type(input1, 'Blog author')
    await user.type(input2, 'Blog url')
    await user.click(send)



    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('Blog author')
    expect(createBlog.mock.calls[0][0].url).toBe('Blog url')
})