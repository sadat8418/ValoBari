import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import Hero from '../hero/Hero';
import ThreeScene from '../components/Box/chatBike'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            
            <div className="w-full py-0 mt-0 text-center">
               <Hero />

            </div>
            
        )
    }
    return (
        <div className='w-full py-8 px-auto'>
            <Container>
                <div className='flex flex-wrap'>
                    
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                        
                    ))}
                       <ThreeScene />
                </div>
            </Container>
        
            
                      
                       
              
        </div>
       
    )
}

export default Home