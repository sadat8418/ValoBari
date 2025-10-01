
//front page video names hero 
import React from 'react'
import { Button } from "@/components/ui/button"
// import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
// import { Link } from 'react-router-dom'

import Video2 from '../assets/1.mp4'
import Video3 from '../assets/4.mp4'
import { Header } from '../components'

function Hero() {
//overlay text-blue-400
    return (
        <div className='hero'>
           <video autoPlay loop muted id='video'>
                <source src={Video2} type='video/mp4' />
                
            </video>
             
              <video autoPlay loop muted id='video2'>
                <source src={Video3} type='video/mp4' />   
            </video>
            <div className="content" >
                 <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent">
                 
                  <Header shadow="shadow-none"/>
            </div>
                <h1 className='text-1xl text-shadow-lg/30'>All your memories in one place</h1>
                     <h1 className="text-2xl text-center text-shadow-lg/30">
                            Login to explore</h1>
                   
            </div>
        </div>
    )
}

export default Hero
