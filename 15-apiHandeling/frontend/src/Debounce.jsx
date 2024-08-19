import { useEffect, useState, useRef } from 'react'
import './App.css'
import axios from 'axios'

// Here in this code, we have a input box which is used to make API call and retrive data according to given input. But here is a flow, when we started to type in input box then every single letter we type is send to as api call instead of full word which will eventually make API request floading. To handle This situation we have debouncing.
// Debouncing is a concept where we forcefully cancel a previous request if a new one is made before the previous one completes.

function Debounce() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const cancelTokenRef = useRef(null) // Use useRef to persist cancelToken across renders

  const fetchData = async () => {

    // Before making new request, Checking if there is an existing cancel token(i.e, if there is an ongoing request.) If yes then cancel that request.
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Canceling the previous request")
    }
    
    // Creating a new cancel token for the new request
    cancelTokenRef.current = axios.CancelToken.source()

    try {
      const result = await axios.get(`/api/products?search=${search}`, {
        cancelToken: cancelTokenRef.current.token
      })
      console.log(result.data);
      setProducts(result.data)
    } catch (error) {
      // When we cancel previous request forcefully then axios assume it as an error, So we need to handle that error manually. 
      if (axios.isCancel(error)) {
        console.log("Alish ! Request canceled", error.message)
      } else {
        console.error("Something went wrong: ", error)
      }
    }
  }

  useEffect(() => {
    fetchData()

    // Cleanup function to cancel the request when the component unmounts or the search changes
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Component unmounted or search changed, canceling the request")
      }
    }
  }, [search])

  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <h1>Number of results: {products.length}</h1>
    </div>
  )
}

export default Debounce
