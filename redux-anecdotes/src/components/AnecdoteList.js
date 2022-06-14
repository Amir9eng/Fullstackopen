import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decreaseVotes, increaseVotes } from '../reducers/anecdoteReducer';


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVotes(id))
  }
  const unVote = (id) => {
    console.log('unvote', id)
    dispatch(decreaseVotes(id))
  }

  return (
    <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
          <button onClick={() => unVote(anecdote.id)}>unvote</button>
        </div>
      </div>
    )}
    
  </div>
  )
}

export default AnecdoteList
