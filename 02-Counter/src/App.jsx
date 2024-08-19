import { useState } from 'react'
import './App.css'

function App() {
  // Here counter is a variable and setCounter is a function ,which is responsible for updating that counter varibale.
  let [counter, setCounter] = useState(0)
  // let Counter = 0

  //React interview question. How to update value multiple times
  // let addValue = ()=>{
  //   setCounter(prevCounter => prevCounter + 1)
  //   setCounter(prevCounter => prevCounter + 1)
  //   setCounter(prevCounter => prevCounter + 1)
  // }

  let addValue = ()=>{
    if(counter < 20){
      counter++
      setCounter(counter)
    }
  }
  let removeValue  = ()=>{
    if(counter > 0){
      counter -- 
      setCounter(counter)
    }
  }

  return (
    <>
    <h1>Chai aur react</h1>
    <h2>Counter value: {counter}</h2>
    <button onClick={addValue}>Add value {counter}</button>
    <button onClick={removeValue}>Remove value {counter} </button>
    <p>Footer: {counter}</p>
    </>
  )
}

export default App
