const Phonebook = ({ search, persons, removePerson }) => {
  // console.log({ persons })
  const peopleToDisplay = search.trim()
    ? persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons
  // console.log(peopleToDisplay)
  return (
    <div>
      {peopleToDisplay.map((person, personIndex) => (
        <div key={personIndex}>
          <p>
            {person.name}: {person.number}
          </p>

          <button
            name={person.name}
            id={person.id}
            onClick={() => removePerson(person)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Phonebook
