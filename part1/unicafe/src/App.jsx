import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
  }

  const StatisticsLine = (props) => {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
  }

  const Statistics = () => {
    return (
      <>
        <h1>statistics</h1>
        {good === 0 && neutral === 0 && bad === 0 ? (
          <p>No feedback given</p>
        ) : (
          <table>
            <tbody>
              <StatisticsLine text='good' value={good} />
              <StatisticsLine text='neutral' value={neutral} />
              <StatisticsLine text='bad' value={bad} />
            </tbody>
          </table>
        )}
      </>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics />
    </div>
  )
}

export default App
