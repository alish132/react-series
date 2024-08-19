import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
 
  // const {products, error, loader} = customReactQuery('/api/products')
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    ;(async() => {
      try {
        setLoader(true)
        setError(false)
        const response = await axios.get(`api/products?search=${search}`, {
          signal: controller.signal
        })
        console.log(response.data);
        setProducts(response.data)
        setLoader(false)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Request cancel');
          return
        }
        setError(true)
        setLoader(false)
      }
    })()

    
    // CleanUp 
    return () => {
      controller.abort()
    }
  }, [search])

  if(error) return <h1>Something went wrong</h1>

  return loader ? <h1>Loading...</h1> :
   (
    <>
    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
    <h1>Number of Products are: {products.length}</h1>
    </>
  )
}

export default App

// ===============>  Custom React Query   ===========>

// const customReactQuery = (urlPath) => {
//   const [products, setProducts] = useState([])
//   const [error, setError] = useState(false)
//   const [loader, setLoader] = useState(false)

//   useEffect(() => {
//     (async() => {
//       try {
//         setLoader(true)
//         setError(false)
//         const response = await axios.get(urlPath)
//         console.log(response.data);
//         setProducts(response.data)
//         setLoader(false)
//       } catch (error) {
//         setError(true)
//         setLoader(false)
//       }
//     })()

//   }, [])

//   return {products, error, loader}
// }
