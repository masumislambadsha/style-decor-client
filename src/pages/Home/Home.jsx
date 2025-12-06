import React from 'react';
import Hero from './Hero/Hero';
import ServiceCategories from './ServiceCategories/ServiceCategories';
import TopDecorators from './TopDecorators/TopDecorators';
import ServiceCoverageArea from './ServiceCoverageMap/ServiceCoverageMap';

const Home = () => {
  return (
    <div className='text-6xl text-center '>
      <Hero/>
      <ServiceCategories/>
      <TopDecorators/>
      <ServiceCoverageArea/>
    </div>
  );
};

export default Home;
