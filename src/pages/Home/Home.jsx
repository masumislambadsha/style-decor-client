import React from 'react';
import Hero from './Hero/Hero';
import ServiceCategories from './ServiceCategories/ServiceCategories';

const Home = () => {
  return (
    <div className='text-6xl text-center '>
      This is Home
      <Hero/>
      <ServiceCategories/>
    </div>
  );
};

export default Home;
