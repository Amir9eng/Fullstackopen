import "./App.css";
import { useState } from "react";
import Statistics from './components/Statistics';
import Button from './components/Button'






function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };


  return (
    <div className="App">
      <h2>Give Feedback</h2>
      <Button onClick={handleGoodClick} label="good" />
      <Button onClick={handleBadClick} label="bad" />
      <Button onClick={handleNeutralClick} label="neutral" />
      <Statistics good = {good} neutral= {neutral} bad = {bad} />
    </div>
  );
}

export default App;
