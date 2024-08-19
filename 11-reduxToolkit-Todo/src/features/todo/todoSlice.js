import { createSlice, nanoid } from "@reduxjs/toolkit";

// This is default data, which means i want to set this data while my app is initilizing.
const initialState = {
    todos: [
        {
            id: 1,
            text: 'Hello World'
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todo', // this name will set for the data
    initialState, // already declared
    reducers: { // Key value function for manipulating the data
        // state mean the prev data. and action means  given input.
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                // text: action.payload.text  // both name(text) are same so last is not required
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
})



// Here we need to export individual functions
export const {addTodo, removeTodo } = todoSlice.actions

// Exporting the main source of reducer because it will be needed in store.js
export default todoSlice.reducer