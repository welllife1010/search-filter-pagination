// https://www.freecodecamp.org/news/how-to-react-components/
// API - https://countryapi.io/
import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const [regionToFilter, setRegionToFilter] = useState("")
  const [paginate, setPaginate] = useState(10)

  useEffect(() => {
    // const request_headers = new Headers()
    // request_headers.append(
    //   "Authorization",
    //   `Bearer ${import.meta.env.VITE_API_KEY}`
    // )
    // request_headers.append("Content-Type", "application/json")
    // const request_options = { method: "GET", header: request_headers }

    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((result) => {
        setLoaded(true)
        setItems(result)
        console.log("result", result)
      })
      .catch((error) => {
        setLoaded(true)
        setError(error)
      })
  }, [])

  const data = Object.values(items)
  console.log("data", data)

  // Get all the keys of all the objects in the data array
  const search_parameters = Object.keys(Object.assign({}, ...data))
  console.log("search_parameters", search_parameters)

  // Return a new array that contain all of the unique values from the region property of each item in the data array.
  const region_filter_options = [...new Set(data.map((item) => item.region))]
  console.log("region_filter_options", region_filter_options)

  function search(items) {
    return items.filter(
      (item) =>
        item.region.includes(regionToFilter) &&
        search_parameters.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(query)
        )
    )
  }

  const load_more = () => {
    setPaginate((prevValue) => prevValue + 10)
  }

  if (error) return <>{error.message}</>
  if (!loaded) return <>Loading...</>

  return (
    <div className="wrapper">
      <div className="search-wrapper">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="sr-only">Search countries here</span>
        </label>
      </div>

      <div className="select">
        <select
          onChange={(e) => setRegionToFilter(e.target.value)}
          className="custom-select"
          aria-label="Filter Countries By Region"
        >
          <option value="">Filter By Region</option>
          {region_filter_options.map((item) => (
            <option key={crypto.randomUUID()} value={item}>
              Filter By {item}
            </option>
          ))}
        </select>
        <span className="focus"></span>
      </div>

      <ul className="card-grid">
        {search(data)
          .slice(0, paginate)
          .map((item) => (
            <li key={item.alpha3Code}>
              <article className="card">
                <div className="card-image">
                  <img src={item.flag.large} alt={item.name} />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{item.name}</h2>
                  <ol className="card-list">
                    <li>
                      population: <span>{item.population}</span>
                    </li>
                    <li>
                      Region: <span>{item.region}</span>
                    </li>
                    <li>
                      Capital: <span>{item.capital}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
      </ul>

      <button onClick={load_more}>Load More</button>
    </div>
  )
}

export default App
