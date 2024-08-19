import React, {useState, useEffect} from 'react';
import {Container, PostCard} from '../index'
import service from '../../appwrite/config';

export default function AllPosts(){
    const [posts,setPosts] = useState([])
    useEffect(() => {}, [])
    service.getPosts([]).then((posts) => {
        if (posts){
            setPosts(posts.documents)
        }
    })
    // console.log(posts);
    // console.log(posts[0]);

    return(
        <div className='w-full py-8'>
            <Container >
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