import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

// importing main source of reducer.
export const store = configureStore({
    reducer: todoReducer
})
