import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAll } from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  
  const dispatch = useDispatch()
  useEffect(() =>  {
    getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
   <div>
    <h2>Anecdotes</h2>
    <Filter />
    <Notification />
    <AnecdoteForm />
    <AnecdoteList />
   </div>
  )
}

export default App