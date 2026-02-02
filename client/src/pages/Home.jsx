import React from 'react'
import Hero from '../components/hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffer from '../components/ExclusiveOffer'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'
import RecommendedHotel from '../components/RecommendedHotel'


const Home = () => {
  return (
    <>
        <Hero/>
        <RecommendedHotel/>
        <FeaturedDestination/>
        <ExclusiveOffer/> 
        <Testimonials/>
        <NewsLetter/>
        
    </>
  )
}

export default Home