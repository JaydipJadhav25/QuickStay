import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../asset/assets';
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { currency, user, axios, toast } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  // Manual JWT token fetch
  const getToken = () => localStorage.getItem('token');

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/bookings/hotel', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (data.success) {
        // Note: your backend returns `dashBoardData`
        setDashboardData(data.dashBoardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div className="m-10">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subtitle="Monitor reservations, manage rooms, track guests, and analyze hotel performance — all from one powerful dashboard designed for smooth hotel operations."
      />

      <div className="flex gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="totalBooking-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Booking</p>
            <p className="text-neutral-400 text-base">{dashboardData.totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="totalRevenue-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              {currency} {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Total Amount</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.user.username}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">{item.room.roomType}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">{currency} {item.totalPrice}</td>
                <td className="py-3 px-4 flex border-t border-gray-300">
                  <button
                    className={`py-3 px-4 text-xs rounded-full mx-auto ${
                      item.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'
                    }`}
                  >
                    {item.isPaid ? 'Completed' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
            {dashboardData.bookings.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No bookings yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
