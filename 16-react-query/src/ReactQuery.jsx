import React, {useState} from 'react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {} from 'react'
import {fetchData, addPost, fetchCountry} from './api/api'

function DataList() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['post'],
        queryFn: fetchData
        // staleTime: 1000*60,  // save data in cache for given time
        // gcTime: 1000*5
        // refetchInterval: 1000*5  // Refetch data after given time 
    })
    const {data: countryData} = useQuery({
        queryKey:['country'],
        queryFn: fetchCountry,
        staleTime: Infinity
    })

    // React query internal API
    const queryClient = useQueryClient()

    const {mutate, isPending, error: postError, rest} =  useMutation({
        mutationFn: addPost,
        onMutate: () => {  // This run before mutate(Post method) 
            return {car:'lambo'}
        },
        // here data and varibale refer to the user given input in post method and  context refer to onMutate return value.
        onSuccess: (data, variables, context) => { 
            // Without this we need to refresh our app to see the added data in page.
            queryClient.invalidateQueries({  
                queryKey: ['post'],
                exact: true,
                // predicate: (query) => 
                //     query.queryKey[0] === 'posts' && query.queryKey[1].page >= 2,
            })
        },
        // This will run on error.
        onError: (error, variables, context) => {}, 
        // This will run no matter success or error
        onSettled: (error, data, variables, context) => {}
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        console.log(formData);
        const name = formData.get('name')
        const country = Array.from(formData.keys()).filter((key) => formData.get(key) === 'on')

        if(!name || !country) return

        mutate({id: data.length+1 , name, data:null})

        e.target.reset()
    }

    
    return (

        <div>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter post' name='name' />
                {countryData?.map((country) => (
                    <div key={country}>
                        <input type="checkbox" name={country} id={country}  />
                        <label htmlFor={country} >{country}</label>
                    </div>
                ))}
                <button type='submit'>Post</button>
            </form>

            {isLoading && <h1>Loading...</h1>}
            {error && <h1>{error.message}</h1>}

            {data && data.map((item) => (
                <div key={item.id}>
                    <h3>{item.name},</h3>
                </div>
            ))}
        </div>

    )
}

export default DataList