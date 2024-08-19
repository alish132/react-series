import { useState } from 'react'


function App() {
  const [color, setColor] = useState('blue')

  return (
    <div className='w-screen h-screen' style={{backgroundColor: color}}>
      <div>
         <button className='m-2 text-black red' style={{backgroundColor:'red'}} onClick={() => setColor('red')}>Red</button>
         <button className='m-2 text-black yellow' style={{backgroundColor:'yellow'}} onClick={() => setColor('yellow')}>Yellow</button>
         <button className='m-2 green' style={{backgroundColor:'green'}} onClick={() => setColor('green')}>Green</button>
      </div>
    </div>
  )
}

export default App
