import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext.jsx'

const RecommendedHotel = () => {
  const { rooms, searchedCities } = useAppContext()
  const [recommended, setRecommended] = useState([])

  // Filter hotels based on searched cities
  useEffect(() => {
    if (rooms.length > 0 && searchedCities.length > 0) {
      const filteredHotels = rooms.filter(room =>
        searchedCities.includes(room.hotel.city)
      )
      setRecommended(filteredHotels)
    }
  }, [rooms, searchedCities])

  if (recommended.length === 0) return null // Return nothing if no recommended hotels

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title
        title='Recommended Hotels'
        subtitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.'
      />

      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedHotel
