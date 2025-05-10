// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   const Header = (props) => {
//     return <h1>{props.name}</h1>
//   }

//   const Content = (props) => {
//     return (
//       <div>
//         {props.parts.map((part) => (
//           <Part key={part.name} name={part.name} exercises={part.exercises} />
//         ))}
//       </div>
//     )
//   }

//   const Part = (props) => {
//     return (
//       <h1>
//         {props.name} {props.exercises}
//       </h1>
//     )
//   }

//   const Total = (props) => {
//     console.log(props)
//     return (
//       <h1>
//         Number of exercises{' '}
//         {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
//       </h1>
//     )
//   }

//   return (
//     <div>
//       <Header name={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }

// export default App

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => {
        return <Part key={part.id} part={part} />
      })}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const total = props.total.reduce((a, b) => a + b, 0)
  return <p>Number of exercises {total}</p>
}

const Course = ({ course }) => {
  const total = course.parts.map((part) => part.exercises)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <div>
        {courses.map((course) => {
          return <Course key={course.id} course={course} />
        })}
      </div>
    </div>
  )
}

export default App
