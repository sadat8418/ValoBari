import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import Hero from '../hero/Hero';
import ThreeScene from '../components/Box/chatBike'
import { div } from 'three/tsl';

function Home() {
  const [posts, setPosts] = useState([])
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents)
      }
      // setLoading(false)
    })
  }, [])


  // if (loading) {
  //   return (
  //     <div className="w-full py-20 text-center">
  //       <p className="text-2xl">Loading...</p>
  //        <div class="lds-facebook"><div></div><div></div><div></div></div>
  //     </div>
  //   )
  // }

  return (posts.length === 0) ? (
     <div className="w-full py-0 mt-0 text-center">
        <Hero />
      </div>
  ) : (
    <div className="w-full py-8 px-auto">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
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
