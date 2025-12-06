import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';

const RootLayout = () => {
  return (
    <div className=''>
      <Navbar/>
      <Outlet/>
    </div>
  );
};

export default RootLayout;
