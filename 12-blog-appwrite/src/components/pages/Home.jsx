import React, { useEffect, useState } from 'react';
import service from '../../appwrite/config';
import {Container, PostCard} from '../index'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home(){
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        service.getPosts().then((post) => {
            if(post){
                setPosts(post.documents)
            }
        })
        setLoader(false)
    }, [])

    if(authStatus == false){
        return(
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <Link to='/login' >
                            <h1 className="text-2xl font-bold hover:text-gray-500 cursor-pointer">
                                Login to read posts
                            </h1>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return loader ? <h1>Loading .....</h1> : 
    (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}