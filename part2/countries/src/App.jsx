import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ handleFilter }) => {
  return (
    <div>
      find countries <input type='text' onChange={handleFilter} />
    </div>
  )
}

const Countries = ({ countriesToShow, handleShow }) => {
  return (
    <div>
      {countriesToShow.map((country) => (
        <div key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => handleShow(country.name.common)}>Show</button>
        </div>
      ))}
    </div>
  )
}

const Country = ({ countriesToShow }) => {
  const country = countriesToShow[0]

  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div style={{ border: '1px solid black', width: 'fit-content' }}>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleShow = (country) => {
    setFilter(country)
  }

  const countriesToShow =
    filter === ''
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <Filter handleFilter={handleFilter} />

      {countriesToShow.length === 1 ? (
        <Country countriesToShow={countriesToShow} />
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <Countries countriesToShow={countriesToShow} handleShow={handleShow} />
      )}
    </div>
  )
}

export default App
