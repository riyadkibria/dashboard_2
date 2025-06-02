'use client';

import { useEffect, useState } from 'react';

export default function DashboardHome() {
  const [totalSales, setTotalSales] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/total-sales');
        const data = await res.json();
        setTotalSales(data.totalSales || 0);
        setOrderCount(data.orderCount || 0);
      } catch (error) {
        console.error('Failed to fetch total sales data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-gray-800 font-semibold text-xl mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {/* Total Orders Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <h2 className="text-sm text-gray-500 mb-1">Total Orders</h2>
          <p className="text-3xl font-semibold text-indigo-600">{orderCount}</p>
        </div>

        {/* Total Sales Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <h2 className="text-sm text-gray-500 mb-1">Total Sales</h2>
          <p className="text-3xl font-semibold text-green-600">৳{totalSales.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
