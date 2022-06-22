import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer, { setAnecdotes } from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';
import notificationReducer from '../reducers/notificationReducer';
import { getAll } from '../services/anecdotes'



getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes)))



export const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})