import React from 'react'
import { useDispatch, useSelector} from 'react-redux'

const AnecdoteList = () => {
  const dispatch = useDispatch()
// const anec = useSelector(state=> state.anecdotes)

  const anecdotes = useSelector(state => {
    const { anecdotes, filter } = state
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })


  const vote = (id, content) => {
    dispatch({type:'anecdotes/voteAnecdotes', payload:id})
    dispatch({type: 'notification/createNotification', payload: `${content} was succesfully upvoted`})
    setTimeout(() => {
      dispatch({type: 'notification/createNotification', payload: ""})
    }, 2000)
    console.log(content);
  }
  const unVote = (id, content) => {
    dispatch({type:'anecdotes/unVoteAnecdotes', payload:id})
    dispatch({type: 'notification/createNotification', payload:`${content} was succesfully unvoted`})
    setTimeout(() => {
      dispatch({type: 'notification/createNotification', payload: ""})
    }, 2000)
  }

  return (
    <div>
      <h2> Anecdotes </h2>
      {anecdotes.map((anecdote, index) => {
        return (
          <div key={index}>
            <div>{anecdote.content}</div> 
            <div>has {anecdote.votes}</div>
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            <button onClick={() => unVote(anecdote.id, anecdote.content)}>unvote</button> 
          </div>
        )
      })}
    </div>
  )
}

export default AnecdoteList
