
//front page video names hero 
import React from 'react'


import { Button } from "@/components/ui/button"
// import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

import Video from '../assets/maldivesVideo.mp4'
import { Header } from '../components'

function Hero() {

    return (
        <div className='hero'>
            
            <video autoPlay loop muted id='video'>
                <source src={Video} type='video/mp4' />
                
            </video>
          
           
            <div className="content">
                 <div className="overlay">
                  <Header/>
            </div>
                <h1 className='text-1xl'>All your memories in one place</h1>
               
                {/* <form className="form flex flex-col items-center justify-center"> */}

                     <h1 className="text-2xl  text-center text-black-900 hover:text-gray-500">
                         
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
