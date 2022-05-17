const Phonebook = ({search, persons}) => {

  const peopleToDisplay =  search.trim() ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) : persons
  return (
    <div>
       {
      peopleToDisplay.map((person, personIndex) =><p key={personIndex}> {person.name}: {person.number}</p>)
    }
    </div>
  )
}

export default Phonebook
