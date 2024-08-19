import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo},...prev])
    // setTodos((prev) => [{id: Date.now(), todo:todo.todo, completed: false},...prev])
  }


  const updateTodo = (id,todoMsg) => {
    // setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    setTodos((prev) => prev.map((prevTodo)=>{
      if(prevTodo.id === id){
        return {...prevTodo, todo:todoMsg}
      }
      else{
        return prevTodo
      }
    }))

  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }


  // Local Storage for getting data while page load 
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  // Local Storage for setting data
  //  This will set local storage every time when todos changes.
  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{todos, updateTodo, addTodo, deleteTodo, toggleComplete}} >
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo)=> (
            <div key={todo.id} className='w-full'>
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
