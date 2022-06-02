import { useEffect, useState } from 'react'
import axios from 'axios'

// const key = process.env.API_KEYS
// const SingleCountry = ({ country, showDefault = false }) => {
//   const [weather, setWeather] = useState({})
//   // console.log(country)
// const {
//   name: { common },
//   capital,
//   area,
//   population,
//   languages,
//   flags
// } = country
//   const [show, setShow] = useState(false)

//   const fetchWeather = async name => {
//     const res = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?appid=${key}&query${name}`
//     )
//     const result = await res.data
//     console.log({ result })
//   }
//   console.log({ country })
//   useEffect(() => {
//     console.log('i am called')
//     if (country) {
//       console.log({ common })
//       fetchWeather('nigeria')
//     }
//   }, [country])

//   console.log({ weather })

//   return (
//     <div>
//       {showDefault || show ? (
//         <div>
//           <h2>{common}</h2>
//           <p>Capital - {capital}</p>
//           <p>Area - {area}</p>
//           <p>Population - {population}</p>
//           <h2>Languages</h2>
//           <ul>
//             {Object.values(languages).map((language, index) => (
//               <li key={index}>{language}</li>
//             ))}
//           </ul>
//           <img
//             src={`${flags.svg}`}
//             alt={`${common}-flag`}
//             style={{ width: '30rem' }}
//           />
//           {/* {weather && (
//             <div>
//               <h4>Weather on {capital}</h4>
//               <p>Temperature: {weather.current.temperature} celcius</p>
//               <img src={weather.current.weather_icons} alt='' />
//               <p>
//                 Wind:{weather.current.wind_speed}mph direction:{' '}
//                 {weather.current.wind_dir}
//               </p>
//             </div>
//           )} */}
//         </div>
//       ) : (
//         <>
//           <span>{common}</span>
//           <button onClick={() => setShow(true)}>show</button>
//         </>
//       )}{' '}
//     </div>
//   )
// }

// const DisplayCountries = ({
//   search,
//   countries,
//   showCountries,
//   setShowCountries
// }) => {
//   const countriesToShow = search.trim()
//     ? countries.filter(country =>
//         country.name.common.toLowerCase().includes(search.toLowerCase())
//       )
//     : []

//   return (
//     <div>
//       {' '}
//       {countriesToShow.length > 10 ? (
//         <p>Too many matches, specify another filter</p>
//       ) : countriesToShow.length === 1 ? (
//         <SingleCountry country={countriesToShow[0]} showDefault={true} />
//       ) : (
//         countriesToShow.map((country, index) => (
//           <div key={index}>
//             <SingleCountry country={country} />
//           </div>
//         ))
//       )}{' '}
//     </div>
//   )
// }

function App () {
  // const [showCountries, setShowCountries] = useState(false)
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = ''

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const weatherApi = capital => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${key}&query${capital}`
      )
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(weatherApi, [])

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  const display =
    filtered.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : filtered.length <= 10 && filtered.length > 1 ? (
      filtered.map(({ name }, index) => (
        <div key={index}>
          {name.common}
          <button value={name.common} onClick={handleSearch}>
            show
          </button>
        </div>
      ))
    ) : (
      filtered.map((country, index) => (
        <div key={index}>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <div>
            <p>Languages:</p>
            <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
          <img
            src={`${country.flags.svg}`}
            alt={`${country.name.common}-flag`}
            style={{ width: '30rem' }}
          />
        </div>
      ))
    )

  return (
    <div className='App'>
      <p>
        filter with
        <input type='text' value={search} onChange={handleSearch} />
      </p>
      {search && display}
    </div>
  )
}

export default App
