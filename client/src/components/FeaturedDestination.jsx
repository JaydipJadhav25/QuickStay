import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext.jsx'

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext()

  if (!rooms || rooms.length === 0) return null

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      
      {/* Section Title */}
      <Title
        title='Featured Destination'
        subtitle='Book luxury stays, best prices, and unforgettable experiences at top destinations worldwide.'
      />

      {/* Hotel Cards */}
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <button
        onClick={() => {
          navigate('/rooms')
          window.scrollTo(0, 0)
        }}
        className='mt-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
      >
        View All Destinations
      </button>
    </div>
  )
}

export default FeaturedDestination
