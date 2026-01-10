import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
const RootLayout = () => {
  return (
    <div className=''>
      <Navbar/>
     <div className='mt-15'> <Outlet/></div>
      <Footer/>
    </div>
  );
};
export default RootLayout;