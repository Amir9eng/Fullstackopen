import { useEffect, useState } from 'react';
import axios from "axios";

    
    const SingleCountry = ({country}) => {
    const {name:{common}, capital, area, population, languages, flags} = country[0]
    return (
      <div>
        <h2>{common}</h2>
        <p>Capital - {capital}</p>
        <p>Area - {area}</p>
        <p>Population - {population}</p>
        <h2>Languages</h2>
        <ul>{Object.values(languages).map((language, index) =>(<li key={index}>{language}</li>) )}</ul>
        <img src={`${flags.svg}`} alt={`${common}-flag`} style={{width: '30rem'}} />
      </div>
    )
  }


  const DisplayCountries = ({ search, countries }) => {
    const countriesToShow = search.trim()
      ? countries.filter((country) =>  country.name.common.toLowerCase().includes(search.toLowerCase())
    
        )
      : [];
    const countriesLength = countriesToShow.length;
  
    return (
      <div>
        {countriesLength === 1 ? (
          <SingleCountry country={countriesToShow} />
        ) : countriesLength < 10 ? (
          countriesToShow.map((country, index) => (
            <p key={index}>{country.name.common}</p>
          ))
        ) : (
          <p>Too many matches, specify another filter </p>
        )}
      </div>
    );
  };


function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  return <div className="App">
    <form onSubmit={(e) => e.preventDefault()}>
      {countries.length? <div>
      find countries: <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div> : <span>Loading...</span>}
    </form>
    <DisplayCountries search={search} countries={countries} />
  </div>;
}

export default App;

