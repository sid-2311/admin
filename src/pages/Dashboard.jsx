// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 120,
    sales: 340,
    revenue: 5600,
  });

  useEffect(() => {
    // ✅ In real project, fetch stats from API here
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Sales</h2>
          <p className="text-2xl font-bold">{stats.sales}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">₹{stats.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
