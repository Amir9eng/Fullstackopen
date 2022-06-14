import { useState, useEffect } from 'react'
import './App.css'
import personService from './services/persons.js'
import React from 'react'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import Search from './components/Search'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(() => showMessage('could not retrieve data'))
  }, [])

  const showMessage = message => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addContact = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newName)) {
      let personId = persons.find(item => item.name === newName)?.id
      let updatedEntry = Object.assign(personId, personObject)

      console.log(personId)

      if (
        window.confirm(
          `Do you want to update ${newName} with number ${newNumber}`
        )
      )
        personService
          .update(personId, personObject)
          .then(() => {
            setPersons(
              persons.map(item => (item.name === newName ? updatedEntry : item))
            )
            return
          })
          .catch(error => {
            setErrorMessage(
              `Contact '${persons.name}' was already removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    }
    personService.create(personObject).then(() => {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      showMessage(`${persons.name} contact created successfully`)
    })
  }
  const removePerson = person => {
    const id = Number(person.id)
    const message = `Are you sure you want to delete ${person.name}`

    if (window.confirm(message) === true) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h2> Phonebook </h2>
      {errorMessage && <Notification message={errorMessage} />}
      <Search search={search} setSearch={setSearch} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        addContact={addContact}
      />{' '}
      <h2> Numbers </h2>
      <Phonebook
        search={search}
        persons={persons}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
