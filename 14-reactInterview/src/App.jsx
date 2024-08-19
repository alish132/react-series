import { useState } from 'react'
import './App.css'

// Here, how multipliedValue is being updated in the UI without using useState ?. For this we need to understand How react render its component. React re-render the whole component if anything changes in its state. In our context when we first load our app there is already calculated value by default. likewise, when i click the multiply button then it update the value through state and when state changes then react re-render the whole component and while re-render the multipliedValue is recalculated with new value and it just reflected to the UI not update, similarly when we first load our application.

function App() {
  const [value, setValue] = useState(1)
  let multipliedValue = value * 5

  const multiply = () => {
    setValue(value + 1)
  }

  return (
    <>
    <h1>Main value is: {value}</h1>
    <button onClick={multiply} >Click to multiply by 5</button>
    <h1>Multiplied value: {multipliedValue} </h1>
    </>
  )
}

export default App
