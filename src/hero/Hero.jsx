
//front page video names hero 
import React from 'react'


import { Button } from "@/components/ui/button"
// import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

import Video2 from '../assets/1.mp4'
import Video3 from '../assets/4.mp4'
import { Header } from '../components'

function Hero() {

    return (
        <div className='hero'>
           <video autoPlay loop muted id='video'>
                <source src={Video2} type='video/mp4' />
                
            </video>
             
              <video autoPlay loop muted id='video2'>
                <source src={Video3} type='video/mp4' />   
            </video>
            <div className="content">
                 <div className="overlay  text-blue-400 shadow-none">
                  <Header/>
            </div>
                <h1 className='text-1xl text-shadow-lg/30'>All your memories in one place</h1>
               
                {/* <form className="form flex flex-col items-center justify-center"> */}

                     <h1 className="text-2xl  text-center text-black-900 hover:text-gray-500 text-shadow-lg/30">
                         
                            <Link to='/login'>
                            Login to explore
              </Link>
                                      </h1>
                    {/* <div>
                        <input type="text" placeholder='Search Destinations' />
                    </div> */}
                    {/* <div>
                        <button><AiOutlineSearch className='icon'/></button>
                    </div> */}
                {/* </form> */}
            </div>
                      
              
        </div>

        
    )
}

export default Hero
