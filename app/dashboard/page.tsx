'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Users } from 'lucide-react';

type Order = {
  id: string;
  createdAt: string | null;
  customerName?: string;
  totalPrice?: number;
  [key: string]: any; // extra order fields
};

export default function DashboardHome() {
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number | null>(null);
  const [latestOrders, setLatestOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [salesRes, customersRes, latestOrdersRes] = await Promise.all([
          fetch('/api/total-sales'),
          fetch('/api/total-customers'),
          fetch('/api/latest-orders'),
        ]);

        const salesData = await salesRes.json();
        const customerData = await customersRes.json();
        const ordersData = await latestOrdersRes.json();

        setTotalSales(salesData.totalSales);
        setOrderCount(salesData.orderCount);
        setCustomerCount(customerData.totalCustomers);

        setLatestOrders(ordersData.latestOrders || []);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoadingOrders(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-gray-800 font-semibold text-2xl mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
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

      {/* Latest Orders Section */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Latest 5 Orders</h2>

        {loadingOrders ? (
          <p>Loading latest orders...</p>
        ) : latestOrders.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {latestOrders.map((order) => (
              <li key={order.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                  </p>
                  {order.customerName && (
                    <p className="text-sm text-gray-500">Customer: {order.customerName}</p>
                  )}
                </div>
                {order.totalPrice !== undefined && (
                  <p className="font-semibold text-green-600">৳{order.totalPrice.toLocaleString()}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
