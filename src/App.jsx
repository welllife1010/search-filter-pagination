// https://www.freecodecamp.org/news/how-to-react-components/
// API - https://countryapi.io/
import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [items, setItems] = useState([])

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
      })
      .catch((error) => {
        setLoaded(true)
        setError(error)
      })
  }, [])

  console.log(items)
  const data = Object.values(items)
  console.log(data)

  if (error) return <>{error.message}</>
  if (!loaded) return <>Loading...</>

  return (
    <div className="wrapper">
      <ul className="card-grid">
        {data.map((item) => (
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
    </div>
  )
}

export default App
