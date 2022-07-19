import { createSlice, current } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"


// const blogReducer = (state = [], action) => {


//     switch (action.type) {
//         case 'INIT_BLOGS':
//             return action.data
//         case 'NEW_BLOG':
//             return state.concat(action.data)
//         case 'DELETE_BLOG':
//             return state.filter((blog) => blog.id !== String(action.data))
//         case 'LIKE':
//             {
//                 const id = action.data.id
//                 const updatedBlog = state.find((blog) => blog.id === id)
//                 const likedBlog = {
//                     ...updatedBlog,
//                     likes: updatedBlog.likes + 1
//                 }
//                 return state.map((blog) => (blog.id !== id ? blog : likedBlog))
//             }

//         default:
//             return state;
//     }
// }

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        initBlogs(state, action) {
            return action.payload
        },
        newBlog(state, action) {
            return state.concat(action.data)
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== String(action.data))
        },
        likeBlog(state, action) {
            const id = action.data.id
            const updatedBlog = state.find((blog) => blog.id === id)
            const likedBlog = {
                ...updatedBlog,
                likes: updatedBlog.likes + 1
            }
            return state.map((blog) => (blog.id !== id ? blog : likedBlog))
        },
        commentBlog(state, action) {
            const { id, res } = action.payload
            const findBlog = current(state).find((blog) => blog.id === id)
            const updateBlog = {
                ...findBlog,
                comment: findBlog.comment.concat(res)
            }
            return state.map((blog) => (blog.id !== id ? blog : updateBlog))
        }
    }
})

export const { initBlogs, likeBlog, commentBlog, newBlog, removeBlog } = blogSlice.actions

export default blogSlice.reducer

export const initializeBlogs = () => {
    return async(dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(initBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async(dispatch) => {
        try {
            const newBlog = await blogService.create(content)
            dispatch(newBlog(newBlog))
        } catch (exception) {
            dispatch(setNotification(`could not create blog`, 'error', 3))
        }
    }
}

export const deleteBlog = (id) => {
    return async(dispatch) => {
        try {
            await blogService.deleteBlog(id)
            dispatch(removeBlog(id))
            dispatch(setNotification(`Blog deleted`, 'success', 3))
        } catch (exception) {
            dispatch(setNotification(`Blog cannot be deleted`, 'error', 3))

        }
    }
}

export const comment = () => {
    return async(dispatch) => {}
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