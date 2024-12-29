import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
        <Navbar/>
        <Header/>
        <Link to="/feedback">Feedback</Link>
    </div>
  )
}

export default Home;