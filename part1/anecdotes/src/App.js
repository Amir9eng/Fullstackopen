import "./App.css";
import { useState } from 'react';

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    'Simplicity is prerequisite for reliability',
    'The competent programmer is fully aware of the strictly limited size of his own skull; therefore he approaches the programming task in full humility, and among other things he avoids clever tricks like the plague.',
    'It\'s hard enough to find an error in your code when you\'re looking for it; it\'s even harder when you\'ve assumed your code is error-free.',
    'A good way to stay flexible is to write less code',
    'Why do we never have time to do it right, but always have time to do it over?.'
  ]
  const [selected, setSelected] = useState(0)
  const randomNumber = Math.floor(Math.random() * 10)

  return <div className="App">
    <div className="anecdotes">
    {anecdotes[selected]}
    </div>
    <button onClick={() => setSelected(randomNumber)}>next anecdotes</button>
  </div>;
}

export default App;
