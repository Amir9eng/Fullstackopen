const PersonForm = ({newName, newNumber, setNewName, setNewNumber, addContact}) => {
  
  return (
    <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>
          number: <input type="number" value={newNumber} onChange={(e)=>setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm
