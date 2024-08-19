
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import Wish from './components/Wish'
import UserContextProvider from './context/UserContextProvider'

function App() {

  return (
    <UserContextProvider>
      < Login />
      <Profile />
      <Wish />
    </ UserContextProvider>
  )
}

export default App
