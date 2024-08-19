import { useState } from 'react'
import './App.css'
import Card from './components/Card'

let myObj = {   /// we can also give this object as input 
  name: 'hitesh',
  email: 'hitesh@gmail.com'
}
let myArr = [1,2,3,4,5]  // We can also give this array as input.

function App() {

  return (
    <>
    <h1 className="text-red-500">Hello World</h1>
    <Card name='MacBook' btnText='Click Me' />
    <Card name='Acer Nitro'  />

    </>
  )
}

export default App
