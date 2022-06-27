import { createSlice } from '@reduxjs/toolkit'
import { create, degrade, getAll, update } from '../services/anecdotes'



const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addVote(state, action) {
            const votedAnecdote = action.payload
            const id = action.payload.id
            console.log('state now: ', state)
            console.log('action', action)
            return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote).sort((a, b) => b.votes - a.votes)
        },
        reduceVote(state, action) {
            const unvoteAnecdotes = action.payload
            const unvoteId = action.payload.id
            console.log('state now: ', state)
            console.log('action', action)
            return state.map(anecdote => anecdote.id !== unvoteId ? anecdote : unvoteAnecdotes).sort((a, b) => b.votes - a.votes)
        },
        appendAnecdotes(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }

})
export const { addVote, reduceVote, appendAnecdotes, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await create(content)
        dispatch(appendAnecdotes(newAnecdote))
    }
}

export const voteAnecdote = (anecdote) => {


    console.log(anecdote, 'from vote')
    return async dispatch => {
        const votedAnecdote = await update(anecdote)
        dispatch(addVote(votedAnecdote))
    }
}

export const unvoteAnecdote = (anecdote) => {

    console.log(anecdote, 'from unvote')
    return async dispatch => {
        const unvotedAnecdote = await degrade(anecdote)
        dispatch(reduceVote(unvotedAnecdote))
    }
}

export default anecdotesSlice.reducer