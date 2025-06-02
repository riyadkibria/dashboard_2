'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Users } from 'lucide-react';

export default function DashboardHome() {
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [salesRes, customersRes] = await Promise.all([
        fetch('/api/total-sales'),
        fetch('/api/total-customers'),
      ]);

      const salesData = await salesRes.json();
      const customerData = await customersRes.json();

      setTotalSales(salesData.totalSales);
      setOrderCount(salesData.orderCount);
      setCustomerCount(customerData.totalCustomers);
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-gray-800 font-semibold text-2xl mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Total Orders */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-3xl font-bold text-gray-800">{orderCount}</p>
          </div>
        </div>

        {/* Total Sales */}
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

        {/* Total Customers */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-3xl font-bold text-gray-800">
              {customerCount !== null ? customerCount : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
