const Search = ({search, setSearch}) => {
 
  return (
    <div>
      filter shown with:<input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
    </div>
  )
}

export default Search
