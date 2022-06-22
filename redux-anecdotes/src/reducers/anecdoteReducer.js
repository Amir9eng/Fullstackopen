import { createSlice } from '@reduxjs/toolkit'
import { createNew, getAll } from '../services/anecdotes'



const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        // createAnecdote(state, action) {
        //     state.push(action.payload)
        // },
        voteAnecdotes(state, action) {

            const id = action.payload
            console.log('state now: ', state)
            console.log('action', action)
            const anecdoteToVote = state.find(anecdote => anecdote.id === id)
            console.log(anecdoteToVote)
            const voteAnecdotes = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(anecdote => anecdote.id !== id ? anecdote : voteAnecdotes).sort((a, b) => b.votes - a.votes)
        },
        unVoteAnecdotes(state, action) {
            const unvoteId = action.payload
            console.log(unvoteId)
            console.log('state now: ', state)
            console.log('action', action)
            const toUnvote = state.find(anecdote => anecdote.id === unvoteId)
            const unvoteAnecdotes = {
                ...toUnvote,
                votes: toUnvote.votes - 1
            }
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
export const {  voteAnecdotes, unVoteAnecdotes, appendAnecdotes, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await createNew(content)
        dispatch(appendAnecdotes(newAnecdote))
    }
}

export default anecdotesSlice.reducer