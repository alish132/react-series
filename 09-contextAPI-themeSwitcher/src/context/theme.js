import { createContext, useContext } from "react";

// Creating context
export const ThemeContext = createContext()

// UserContext.Provider is a component that provides the context value to its children. The value provided can be any data type, such as an object, array, or primitive value.
export const ThemeProvider = ThemeContext.Provider

// useContext hook allow you to consume the context value. Like getting data and updating data.
export default function useTheme(){
    return useContext(ThemeContext)
}