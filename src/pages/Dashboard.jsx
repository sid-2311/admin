// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { ShoppingCart, DollarSign, RotateCcw, Users } from "lucide-react";

const Dashboard = () => {
  const [todayStats, setTodayStats] = useState({
    totalBooking: 9,
    awaitingBooking: 8,
    activeBooking: 0,
    completeBooking: 1,
    totalEarnings: 258,
    withdrawRequest: 0,
    refundRequest: 0,
    newClient: 0,
  });

  const [monthStats, setMonthStats] = useState({
    totalBooking: 0,
    awaitingBooking: 0,
    activeBooking: 0,
    completeBooking: 0,
    totalEarnings: 0,
    withdrawRequest: 0,
    refundRequest: 0,
    newClient: 2,
  });

  useEffect(() => {
    // ✅ In real project, fetch stats from API here
  }, []);

  const Card = ({ title, value, color, icon }) => (
    <div className="bg-white shadow-lg  flex items-center p-6 h-36">
      <div
        className={`w-16 h-16 flex items-center justify-center text-2xl ${color}`}
      >
        {icon}
      </div>
      <div className="ml-6">
        <h3 className="text-base text-gray-500">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}

      {/* Today Section */}
      <h2 className="text-2xl font-semibold mb-6">Today</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
        <Card
          title="Total Booking"
          value={todayStats.totalBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Awaiting Booking"
          value={todayStats.awaitingBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Active Booking"
          value={todayStats.activeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Complete Booking"
          value={todayStats.completeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Total Earnings"
          value={`$${todayStats.totalEarnings}`}
          color="bg-green-500 text-white"
          icon={<DollarSign size={28} />}
        />
        <Card
          title="Withdraw Request"
          value={`$${todayStats.withdrawRequest}`}
          color="bg-green-500 text-white"
          icon={<DollarSign size={28} />}
        />
        <Card
          title="Refund Request"
          value={`$${todayStats.refundRequest}`}
          color="bg-green-500 text-white"
          icon={<RotateCcw size={28} />}
        />
        <Card
          title="New Client/Provider"
          value={todayStats.newClient}
          color="bg-green-500 text-white"
          icon={<Users size={28} />}
        />
      </div>

      {/* This Month Section */}
      <h2 className="text-2xl font-semibold mb-6">This Month</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          title="Total Booking"
          value={monthStats.totalBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Awaiting Booking"
          value={monthStats.awaitingBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Active Booking"
          value={monthStats.activeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Complete Booking"
          value={monthStats.completeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart size={28} />}
        />
        <Card
          title="Total Earnings"
          value={`$${monthStats.totalEarnings}`}
          color="bg-orange-400 text-white"
          icon={<DollarSign size={28} />}
        />
        <Card
          title="Withdraw Request"
          value={`$${monthStats.withdrawRequest}`}
          color="bg-orange-400 text-white"
          icon={<DollarSign size={28} />}
        />
        <Card
          title="Refund Request"
          value={`$${monthStats.refundRequest}`}
          color="bg-orange-400 text-white"
          icon={<RotateCcw size={28} />}
        />
        <Card
          title="New Client/Provider"
          value={monthStats.newClient}
          color="bg-orange-400 text-white"
          icon={<Users size={28} />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
