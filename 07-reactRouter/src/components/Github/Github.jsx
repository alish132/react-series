import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Github(){
    const data = useLoaderData()

    return(
        <div>
            <img className='w-[10rem]' src={data.avatar_url} alt="" />
        </div>
    )
}

export async function gitHubInfo(){
    console.log('data fetching');
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()
}