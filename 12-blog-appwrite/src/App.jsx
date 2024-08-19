import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice'
import  Header  from './components/Header/Header'
import  Footer  from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  
// When you reload the page then your redux-toolkit data will be deleted so, we need to again set the userStatus and userData.
  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  // return !loading ? (
  //   <div>Test</div>
  // ) : <div>loading</div>
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}



export default App
