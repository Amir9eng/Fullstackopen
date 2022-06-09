import { React } from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';


test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()


    const { container } = render( <
        BlogForm createBlog = { createBlog }
        />
    )

    const input = container.querySelector('input')
    const form = container.querySelector('form')

    fireEvent.change(input, {
        target: { value: 'Go to problem' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Go to problem')
})