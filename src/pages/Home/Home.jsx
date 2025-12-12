import React, { useEffect } from 'react';
import Hero from './Hero/Hero';
import ServiceCategories from './ServiceCategories/ServiceCategories';
import TopDecorators from './TopDecorators/TopDecorators';
import ServiceCoverageArea from './ServiceCoverageMap/ServiceCoverageMap';

const Home = () => {
   useEffect(() => {
    document.title = "Style Decor | Home ";
  }, []);
  return (
    <div className=''>
      <Hero/>
      <ServiceCategories/>
      <TopDecorators/>
      <ServiceCoverageArea/>
    </div>
  );
};

export default Home;
