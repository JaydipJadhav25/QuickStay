import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../asset/assets';

const HotelCard = ({ room, index }) => {
  const navigate = useNavigate();

  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="relative max-w-[280px] w-full rounded-xl overflow-hidden bg-white text-gray-500 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] cursor-pointer"
    >
      {/* Hotel Image */}
      <img
        src={room.images?.[0]}
        alt={room.hotel?.name || "hotel"}
        className="w-full h-48 object-cover"
      />

      {/* Best Seller Tag */}
      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
          Best Seller
        </p>
      )}

      <div className="p-4 pt-5">
        {/* Hotel Name + Rating */}
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotel?.name}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            <span>4.5</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm mt-1 text-gray-500">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel?.address}</span>
        </div>

        {/* Price + Book Button */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-800 text-lg">
            ${room.pricePerNight} <span className="text-sm text-gray-500">/night</span>
          </p>

          <button
            onClick={(e) => {
              e.preventDefault(); // stop Link navigation
              e.stopPropagation(); // stop bubbling
              navigate(`/rooms/${room._id}`);
              window.scrollTo(0, 0);
            }}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
