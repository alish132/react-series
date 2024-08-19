import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }, [password])

  // useCallBack hook
  // passwordGenerator function
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNPOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += ',@!#$%^&*=+-/*[}{}'

    for(let i=0; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str[char]
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  // useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    // for Input box
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3 text-black' placeholder='Password' readOnly ref={passwordRef} />
        <button onClick={copyPasswordToClipBoard} className='text-white bg-blue-500 text-[20px] px-1'>Copy</button>
      </div>
      {/* for password length ratio */}
      <div className='flex text-sm gap-x-2 '>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value);}} />
          <label className='text-white'>Length: {length}</label>
        </div>
        {/* For number allowed box */}
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={(e) => {setNumberAllowed((prev) => !prev);} } />
          <label htmlFor='numberInput'>Number</label>
        </div>
        {/* for character allowed box */}
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id='characterInput' onChange={() => {setCharAllowed((prev) => !prev)}} />
          <label htmlFor="characterInput">Character</label>
        </div>

      </div>
    </div>
  )
}

export default App
