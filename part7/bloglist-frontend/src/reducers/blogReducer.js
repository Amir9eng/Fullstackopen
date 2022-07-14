import blogService from "../services/blogs"

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
            console.log('error')
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
            console.log('blog cannot be deleted')

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
            console.log('blog cannot be liked')
        }
    }
}


export default blogReducer