import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  unvoteAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
        // const anec = useSelector(state=> state.anecdotes)

    const anecdotes = useSelector(state => {
        const { anecdotes, filter } = state
        return anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
    })


    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
            // dispatch(voteAnecdote(votedAnecdote))
         dispatch({ type: 'notification/createNotification', payload: `${anecdote.content} was succesfully upvoted` })
        setTimeout(() => {
            dispatch({ type: 'notification/createNotification', payload: "" })
        }, 2000)
        console.log(anecdote.content);
    }
    const unVote = (anecdote) => {
        dispatch(unvoteAnecdote(anecdote))
        dispatch({ type: 'notification/createNotification', payload: `${anecdote.content} was succesfully unvoted` })
        setTimeout(() => {
            dispatch({ type: 'notification/createNotification', payload: "" })
        }, 2000)
    }

    return ( <div>
            <h2> Anecdotes </h2> {
            anecdotes.map((anecdote, index) => {
                return ( <div key = { index }>
                    <div> { anecdote.content } </div>  <div> has { anecdote.votes } </div> <button onClick = {
                        () => vote(anecdote)
                    } > vote </button> <button onClick = {
                        () => unVote(anecdote)
                    }> unvote </button>  </div>
                )
            })
        } </div>
)
}

export default AnecdoteList