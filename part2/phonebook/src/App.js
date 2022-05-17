import { useState, useEffect } from "react";
import "./App.css";


import React from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm';
import Phonebook from "./components/Phonebook";
import Search from './components/Search';



const App = () => {


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState("")
     

    useEffect(() => {
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
       setPersons(response.data)
     })
    }, [])


     const addContact = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch}/>
     <PersonForm 
      newName= {newName}
      setNewName= {setNewName}
      setNewNumber = {setNewNumber}
      newNumber= {newNumber}
      addContact= {addContact}
     />
      <h2>Numbers</h2>

    <Phonebook search= {search} persons= {persons} />
    </div>
  )
}

export default App

