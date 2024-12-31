import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';
import { Link } from 'react-router-dom';
import Footer from './Footer.jsx'; // Import Footer component

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
      
      {/* Footer Component */}
      <div className='w-full'>
      <Footer />
      </div>
      
      {/* <Link to="/feedback">Feedback</Link> */}
    </div>
  );
};

export default Home;
