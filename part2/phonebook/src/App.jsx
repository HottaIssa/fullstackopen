import { useEffect, useState } from 'react'
import { getAll, create, update, onDelete } from './services/persons.js'
import './index.css'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with:
      <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonsForm = ({
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </>
  )
}

const Notification = ({ message, typeMessage }) => {
  const color = typeMessage === 'add' ? 'green' : 'red'

  const notificationStyle = {
    color: `${color}`,
    width: '100%',
    padding: '4px',
    border: `2px solid ${color}`,
    backgroundColor: 'rgb(200,200,200)'
  }
  if (message === null) {
    return null
  }

  return (
    <div className='error' style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('')

  useEffect(() => {
    getAll().then((response) => setPersons(response.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const existPerson = persons.find(
      (person) => person.name.toLowerCase() == newName.toLowerCase()
    )

    if (existPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const updatePerson = { ...existPerson, number: newNumber }
        update(updatePerson.id, updatePerson)
          .then(() =>
            setPersons(
              persons.map((person) =>
                person.id === existPerson.id ? updatePerson : person
              )
            )
          )
          .catch((error) => handleMessage('error'))
        setNewName('')
        setNewNumber('')
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      create(newPerson).then((response) =>
        setPersons(persons.concat(response.data))
      )
      handleMessage('add')
      setNewName('')
      setNewNumber('')
    }
  }

  const handleMessage = (typeMessage) => {
    if (typeMessage === 'add') {
      setMessage(`Added ${newName}`)
      setTypeMessage('add')
    }
    if (typeMessage === 'error') {
      setMessage(
        `Information of ${newName} has already been removed from server`
      )
      setTypeMessage('error')
    }

    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      onDelete(id)
      setPersons(persons.filter((p) => p.id !== id))
    }
  }

  const personsToShow =
    filter == ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} typeMessage={typeMessage} />}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a New</h3>
      <PersonsForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
