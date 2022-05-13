const Statistics = ({ good, neutral, bad }) => {
  const average = (good + neutral + bad) / 3;
  const positive = (good / (good + bad + neutral)) * 100;

  return (
    <>
      <h3>Statistics</h3>
  {
    good || bad || neutral ? <><p>Good {good} </p>
    <p>Neutral {neutral} </p>
    <p>Bad {bad}</p>
    <p>Average {average}</p>
  <p>Positive {positive ? Math.round(positive) : 0}%</p></>:"No feedback given"
  }
      
</>
  );
};

export default Statistics
