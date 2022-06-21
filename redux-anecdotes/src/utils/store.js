import { createStore, combineReducers } from 'redux';
import anecdotesReducer, { setAnecdotes } from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';
import notificationReducer from '../reducers/notificationReducer';
import { getAll } from '../services/anecdotes'





const reducer = combineReducers({
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer
})

getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes)))



export const store = createStore(
    reducer
)