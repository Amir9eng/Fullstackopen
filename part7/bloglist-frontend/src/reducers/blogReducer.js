import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"


const blogReducer = (state = [], action) => {


    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'DELETE_BLOG':
            return state.filter((blog) => blog.id !== String(action.data))
        case 'LIKE':
            {
                const id = action.data.id
                const updatedBlog = state.find((blog) => blog.id === id)
                const likedBlog = {
                    ...updatedBlog,
                    likes: updatedBlog.likes + 1
                }
                return state.map((blog) => (blog.id !== id ? blog : likedBlog))
            }

        default:
            return state;
    }
}

export const initializeBlogs = () => {
    return async(dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (content) => {
    return async(dispatch) => {
        try {
            const newBlog = await blogService.create(content)
            dispatch({
                type: 'NEW_BLOG',
                data: newBlog
            })
        } catch (exception) {
            dispatch(setNotification(`could not create blog`, 'error', 3))
        }
    }
}

export const deleteBlog = (id) => {
    return async(dispatch) => {
        try {
            await blogService.deleteBlog(id)
            dispatch({
                type: 'DELETE_BLOG',
                data: id
            })
        } catch (exception) {
            dispatch(setNotification(`Blog cannot be deleted`, 'error', 3))

        }
    }
}


export const like = (blog) => {
    return async(dispatch) => {
        try {
            const likedBlog = await blogService.update({
                ...blog,
                likes: blog.likes + 1
            })
            dispatch({
                type: 'LIKE',
                data: likedBlog
            })
        } catch (exception) {
            dispatch(setNotification(`could not like blog${blog.title}`, 'error', 3))
        }
    }
}


export default blogReducer