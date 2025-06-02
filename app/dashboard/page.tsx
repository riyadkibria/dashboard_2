'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign } from 'lucide-react';

export default function DashboardHome() {
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalSales() {
      const response = await fetch('/api/total-sales');
      const data = await response.json();

      setTotalSales(data.totalSales);
      setOrderCount(data.orderCount);
    }

    fetchTotalSales();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-gray-800 font-semibold text-2xl mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
        {/* Total Orders Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-3xl font-bold text-gray-800">{orderCount}</p>
          </div>
        </div>

        {/* Total Sales Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-3xl font-bold text-gray-800">
              {totalSales !== null ? `৳${totalSales.toLocaleString()}` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
