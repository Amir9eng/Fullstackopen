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
            ``
    }
}