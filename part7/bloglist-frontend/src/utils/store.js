import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from '../reducers/userReducer'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import authReducer from '../reducers/authReducers'

const reducer = combineReducers({
    user: authReducer,
    users: userReducer,
    blog: blogReducer,
    notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store