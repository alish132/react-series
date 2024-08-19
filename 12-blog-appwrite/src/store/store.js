import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
    // reducer: authReducer
    reducer: {
        auth: authReducer,
      },
})