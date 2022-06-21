import { createStore, combineReducers } from 'redux';
import anecdotesReducer from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';
import notificationReducer from '../reducers/notificationReducer';




const reducer = combineReducers({
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer
})

export const store = createStore(
    reducer
)