import React, {useState, useId} from 'react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {} from 'react'
import {fetchData, addPost, fetchCountry} from './api/api'

function Pagination() {

    const [page, setPage] = useState(1)


    const { isLoading, error, data } = useQuery({
        queryKey: ['post', {page}],
        queryFn: () => fetchData(page),
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
        const name = formData.get('name')
        const country = Array.from(formData.keys()).filter((key) => formData.get(key) === 'on')

        if(!name || !country) return

        mutate({id: Math.random() , name, data:null})

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
            <button onClick={()=>setPage((prevPage) => Math.max(prevPage-1, 0))}
            disabled={!data?.prev}
            >Previous page</button>
            <span>{page}</span>
            <button onClick={() => setPage((prevPage) => prevPage+1)}
            disabled={!data?.next}
            >Next page</button>

            {isLoading && <h1>Loading...</h1>}
            {error && <h1>{error.message}</h1>}

            {data && data.data.map((item) => (
                <div key={item.id}>
                    <h3>{item.name},</h3>
                </div>
            ))}
        </div>

    )
}

export default Pagination