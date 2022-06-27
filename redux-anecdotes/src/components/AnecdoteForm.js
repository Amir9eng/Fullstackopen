import { React } from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = (props) => {

    console.log(props)
    const newAnecdotes = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        console.log(anecdote)
        if(anecdote === '') {
            alert('input field is required')
        return
     } 
        e.target.anecdote.value = '';
        props.createAnecdote(anecdote)
        props.setNotification(`${anecdote} was succesfully created`, 1000)
    }


    return ( <div>
        <h2>create new</h2> <form onSubmit = { newAnecdotes } >
        <div><input name = 'anecdote' /></div><button type = 'submit'>create</button> 
        </form> </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchtoProps = {
    createAnecdote,
    setNotification
}
const ConnectedAnecdoteForm = connect(mapStatetoProps, mapDispatchtoProps)(AnecdoteForm)


export default ConnectedAnecdoteForm