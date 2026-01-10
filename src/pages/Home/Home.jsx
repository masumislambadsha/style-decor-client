import React, { useEffect } from 'react';
import Hero from './Hero/Hero';
import ServiceCategories from './ServiceCategories/ServiceCategories';
import TopDecorators from './TopDecorators/TopDecorators';
import ServiceCoverageArea from './ServiceCoverageMap/ServiceCoverageMap';
import Testimonials from './Testimonials/Testimonials';
import FAQ from './FAQ/FAQ';
import Newsletter from './Newsletter/Newsletter';
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
      <Testimonials/>
      <FAQ/>
      <Newsletter/>
    </div>
  );
};
export default Home;