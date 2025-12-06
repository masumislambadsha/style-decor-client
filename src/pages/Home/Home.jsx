import React from 'react';
import Hero from './Hero/Hero';
import ServiceCategories from './ServiceCategories/ServiceCategories';
import TopDecorators from './TopDecorators/TopDecorators';

const Home = () => {
  return (
    <div className='text-6xl text-center '>
      This is Home
      <Hero/>
      <ServiceCategories/>
      <TopDecorators/>
    </div>
  );
};

export default Home;
