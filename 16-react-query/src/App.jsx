import React, { useState } from 'react'
import Pagination from './Pagination'

function App() {
  const [Toggle, setToggle] = useState(true)
  
  return (
    <div>
      <button onClick={() => setToggle(!Toggle)}>Click Me</button>
      {Toggle && <Pagination /> }

    </div>
    // <DataList />
  )
}

export default App