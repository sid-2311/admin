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
    <div className="bg-white shadow rounded-lg flex items-center p-4">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-md ${color}`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Today Section */}
      <h2 className="text-xl font-semibold mb-4">Today</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card
          title="Total Booking"
          value={todayStats.totalBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Awaiting Booking"
          value={todayStats.awaitingBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Active Booking"
          value={todayStats.activeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Complete Booking"
          value={todayStats.completeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Total Earnings"
          value={`$${todayStats.totalEarnings}`}
          color="bg-green-500 text-white"
          icon={<DollarSign />}
        />
        <Card
          title="Withdraw Request"
          value={`$${todayStats.withdrawRequest}`}
          color="bg-green-500 text-white"
          icon={<DollarSign />}
        />
        <Card
          title="Refund Request"
          value={`$${todayStats.refundRequest}`}
          color="bg-green-500 text-white"
          icon={<RotateCcw />}
        />
        <Card
          title="New Client/Provider"
          value={todayStats.newClient}
          color="bg-green-500 text-white"
          icon={<Users />}
        />
      </div>

      {/* This Month Section */}
      <h2 className="text-xl font-semibold mb-4">This Month</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Booking"
          value={monthStats.totalBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Awaiting Booking"
          value={monthStats.awaitingBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Active Booking"
          value={monthStats.activeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Complete Booking"
          value={monthStats.completeBooking}
          color="bg-indigo-500 text-white"
          icon={<ShoppingCart />}
        />
        <Card
          title="Total Earnings"
          value={`$${monthStats.totalEarnings}`}
          color="bg-orange-400 text-white"
          icon={<DollarSign />}
        />
        <Card
          title="Withdraw Request"
          value={`$${monthStats.withdrawRequest}`}
          color="bg-orange-400 text-white"
          icon={<DollarSign />}
        />
        <Card
          title="Refund Request"
          value={`$${monthStats.refundRequest}`}
          color="bg-orange-400 text-white"
          icon={<RotateCcw />}
        />
        <Card
          title="New Client/Provider"
          value={monthStats.newClient}
          color="bg-orange-400 text-white"
          icon={<Users />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
