'use client';

import { useEffect, useState } from 'react';

export default function DashboardHome() {
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalSales() {
      const response = await fetch('/api/total-sales');
      const data = await response.json();

      setTotalSales(data.totalSales);
      setOrderCount(data.orderCount); // assuming API sends this
    }

    fetchTotalSales();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-gray-800 font-semibold text-xl mb-4">Dashboard Overview</h1>

      <p className="text-sm text-gray-500 mb-4">
        Total Orders: {orderCount}
      </p>

      <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm">
        <h2 className="text-gray-600 text-md">Total Sales</h2>
        <p className="text-2xl font-bold text-green-600">
          {totalSales !== null ? `৳${totalSales.toLocaleString()}` : 'Loading...'}
        </p>
      </div>
    </div>
  );
}
