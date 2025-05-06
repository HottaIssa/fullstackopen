const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return <h1>{props.name}</h1>
  }

  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => (
          <Part key={part.name} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }

  const Part = (props) => {
    return (
      <h1>
        {props.name} {props.exercises}
      </h1>
    )
  }

  const Total = (props) => {
    console.log(props)
    return (
      <h1>
        Number of exercises{' '}
        {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </h1>
    )
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
