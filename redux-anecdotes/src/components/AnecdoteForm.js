import { React } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNew } from '../services/anecdotes';

const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const newAnecdotes = async (e) => {
        e.preventDefault()
        const anecdote = e.target.newAnecdote.value
        console.log(anecdote)
        e.target.newAnecdote.value = '';
        const newAnecdote = await createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch({type: 'notification/createNotification', payload: `Anecdote was successfully created`})
        setTimeout(() => {
            dispatch({type: 'notification/createNotifcation', payload: null})
        }, 2000)
    }


    return ( <div>
        <h2>create new</h2> <form onSubmit = { newAnecdotes } >
        <div><input name = 'newAnecdote' /></div><button type = 'submit'>create</button> 
        </form> </div>
    )
}

export default AnecdoteForm