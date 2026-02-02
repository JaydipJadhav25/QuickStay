import React, { useMemo, useState } from 'react';
import { assets, facilityIcons } from '../asset/assets';
import { useSearchParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext.jsx';

/* ================= CHECKBOX ================= */
const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex items-center gap-3 mt-2 text-sm text-gray-700 cursor-pointer">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="w-4 h-4 accent-black cursor-pointer"
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

/* ================= RADIO ================= */
const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex items-center gap-3 mt-2 text-sm text-gray-700 cursor-pointer">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
      className="w-4 h-4 accent-black cursor-pointer"
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState('');

  // ================= FILTER OPTIONS =================
  const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'];
  const priceRange = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
  const sortOptions = ['Price Low to High', 'Price High to Low', 'Newest First'];

  // Handle changes for filters and sorting
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) updatedFilters[type].push(value);
      else updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
      return updatedFilters;
    });
  };

  const handleSortChange = (sortOption) => setSelectedSort(sortOption);

  // Function to check if a room matches the selected room types
  const matchesRoomType = (room) =>
    selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);

  // Function to check if a room matches the selected price ranges
  const matchesPriceRange = (room) =>
    selectedFilters.priceRange.length === 0 ||
    selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(' to ').map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });

  // Function to sort rooms based on the selected sort option
  const sortRooms = (a, b) => {
    if (selectedSort === 'Price Low to High') return a.pricePerNight - b.pricePerNight;
    if (selectedSort === 'Price High to Low') return b.pricePerNight - a.pricePerNight;
    if (selectedSort === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  // Filter Destination
  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  // Filter and sort rooms based on selected filters and sort option
  const filteredRooms = useMemo(() => {
    return rooms.filter(
      (room) => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({ roomType: [], priceRange: [] });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* ================= LEFT SIDE – ROOMS ================= */}
      <div className="flex flex-col flex-1">
        <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xl">
          Ultra-luxurious living with bespoke interiors, panoramic views, and world-class amenities.
        </p>

        <div className="flex flex-col gap-14 mt-14">
          {filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col gap-6 md:flex-row items-start py-10 border-b border-gray-200 last:border-0"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt=""
                className="w-full md:w-[280px] h-[200px] rounded-xl shadow-lg object-cover cursor-pointer"
              />

              <div className="flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-3xl font-playfair cursor-pointer"
                >
                  {room.hotel.name}
                </p>

                <div className="flex items-center">
                  <StarRating />
                  <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
                </div>

                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} className="w-4 h-4" />
                  <span>{room.hotel.address}</span>
                </div>

                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                    >
                      <img src={facilityIcons[item]} className="w-5 h-5" />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xl font-medium text-gray-700">
                  {currency} {room.pricePerNight} / night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT SIDE – FILTER ================= */}
      <div className="bg-white w-full lg:w-80 border border-gray-200 text-gray-700 max-lg:mb-8 lg:mt-16">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-semibold">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span onClick={() => setOpenFilters(!openFilters)} className="lg:hidden">
              {openFilters ? 'HIDE' : 'SHOW'}
            </span>
            <span
              className="hidden lg:block"
              onClick={clearFilters}
            >
              CLEAR
            </span>
          </div>
        </div>

        <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden`}>
          {/* Room Type Filters */}
          <div className="px-4 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold mb-3">Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(checked) => handleFilterChange(checked, room, 'roomType')}
              />
            ))}
          </div>

          {/* Price Range Filters */}
          <div className="px-4 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold mb-3">Price Range</p>
            {priceRange.map((range, index) => (
              <CheckBox
                key={index}
                label={range}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}
              />
            ))}
          </div>

          {/* Sort By */}
          <div className="px-4 py-4">
            <p className="text-sm font-semibold mb-3">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={() => handleSortChange(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
