import React from 'react'
import ReactDOM from 'react-dom/client'
import Wish from './App.jsx'

const user = 'Alish'

const newelement = React.createElement(
  'a',
  {href: 'https://google.com', target:'_blank', title:'Just Testing'},
  'Click Me',
  user
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // newelement
  <Wish />
)
