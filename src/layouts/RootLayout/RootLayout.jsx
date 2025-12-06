import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const RootLayout = () => {
  return (
    <div className=''>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default RootLayout;
