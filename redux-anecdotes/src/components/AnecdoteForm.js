import { React } from 'react';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const newAnecdotes = (e) => {
        e.preventDefault()
        const content = e.target.newAnecdote.value
        console.log(content)
        e.target.newAnecdote.value = '';
        dispatch({type:'anecdotes/createAnecdotes', payload:content})

        dispatch({type: 'notification/createNotification', payload: `Anecdote was successfully created`})
        setTimeout(() => {
            dispatch({type: 'notification/createNotifcation', payload: null})
        }, 5000)
    }


    return ( <div>
        <h2>create new</h2> <form onSubmit = { newAnecdotes } >
        <div><input name = 'newAnecdote' /></div><button type = 'submit'>create</button> 
        </form> </div>
    )
}

export default AnecdoteForm