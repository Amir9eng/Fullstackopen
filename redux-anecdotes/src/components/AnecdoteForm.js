import { React } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAnecdote } from './../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  
  const newAnecdotes = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    console.log(content)
    e.target.newAnecdote.value = ''
    dispatch(addNewAnecdote(content))
  }


  return (
    <div>
     <h2>create new</h2>
      <form onSubmit={newAnecdotes}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
