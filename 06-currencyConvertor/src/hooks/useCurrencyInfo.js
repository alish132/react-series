// Custom hook

import { useState, useEffect } from 'react'

function useCurrencyInfo(currency) {
    const [data, setData] = useState({}) // Initialize state to store currency data

    useEffect(() => {
        // Fetch currency data when the component mounts or when 'currency' changes
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => setData(data[currency])) // Update the state with the fetched data
            console.log('run fetch');
    }, [currency]) // Dependency array: run effect when 'currency' changes

    // console.log(data); // Log the data to the console

    return data // Return the fetched data
}

export default useCurrencyInfo
