import blogService from './../services/blogs';
// import loginService from './../services/login';
// import { setNotification } from './notificationReducer';


const userReducer = (state = null, action) => {


    switch (action.type) {
        case 'INIT_ALL_USERS':
            return action.user
        default:
            return state;
    }
}


export const initializeAllUsers = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
        const users = blogService.getAll()

        return {
            type: 'INIT_ALL_USERS',
            data: users
        }
    }
}

// export const login = (username, password) => {
//     return async(dispatch) => {
//         try {
//             const user = await loginService.login({
//                 username,
//                 password
//             })

//             window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
//             blogService.setToken(user.token)
//             dispatch({
//                 type: 'LOGIN',
//                 user: user
//             })

//         } catch (exception) {
//             dispatch(setNotification('wrong credentials', 'error', 5))
//         }
//     }
// }

// export const logout = () => {
//     return async(dispatch) => {
//         window.localStorage.removeItem('loggedBlogappUser')
//         dispatch({
//             type: 'LOGOUT',
//             data: null
//         })
//     }
// }

export default userReducer