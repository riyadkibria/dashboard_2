'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Users } from 'lucide-react';

type Order = {
  id: string;
  userId?: string;
  createdAtISO?: string | null;
  createdAtFormatted?: string | null;
  name?: string | null;
  mobile?: string | null;
  address?: string | null;
  productName?: string | null;
  productPrice?: string | null;
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
          fetch('/api/total-sales', { cache: 'no-store' }),
          fetch('/api/total-customers', { cache: 'no-store' }),
          fetch('/api/latest-orders', { cache: 'no-store' }),
        ]);

        const salesData = await salesRes.json();
        const customerData = await customersRes.json();
        const ordersData = await latestOrdersRes.json();

        setTotalSales(salesData.totalSales ?? 0);
        setOrderCount(salesData.orderCount ?? 0);
        setCustomerCount(customerData.totalCustomers ?? 0);
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
        <Card icon={<ShoppingCart />} title="Total Orders" value={orderCount} bg="indigo" />
        <Card
          icon={<DollarSign />}
          title="Total Sales"
          value={totalSales !== null ? `৳${totalSales.toLocaleString()}` : 'Loading...'}
          bg="green"
        />
        <Card
          icon={<Users />}
          title="Total Customers"
          value={customerCount !== null ? customerCount : 'Loading...'}
          bg="blue"
        />
      </div>

      {/* Latest Orders Section */}
      <div className="max-w-5xl w-full bg-blue-50 rounded-2xl p-6 shadow-inner">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Latest 5 Orders</h2>

        {loadingOrders ? (
          <p className="text-gray-500">Loading latest orders...</p>
        ) : latestOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders found.</p>
        ) : (
          <ul className="space-y-4">
            {latestOrders.map((order) => (
              <li
                key={order.id}
                className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition"
              >
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Order ID: <span className="text-gray-700">{order.id}</span></p>
                  <p className="text-sm text-gray-500">Date: <span className="text-gray-700">{order.createdAtFormatted || 'Unknown date'}</span></p>
                  <p className="text-sm text-gray-500">Name: <span className="text-gray-700">{order.name || 'N/A'}</span></p>
                  <p className="text-sm text-gray-500">Mobile: <span className="text-gray-700">{order.mobile || 'N/A'}</span></p>
                  <p className="text-sm text-gray-500">Address: <span className="text-gray-700">{order.address || 'N/A'}</span></p>
                  <p className="text-sm text-gray-500">Product: <span className="text-gray-700">{order.productName || 'N/A'}</span></p>
                  <p className="text-sm font-bold text-green-600">{order.productPrice || '৳0'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bg: 'indigo' | 'green' | 'blue';
}) {
  const bgColor = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
  }[bg];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition">
      <div className={`${bgColor} p-3 rounded-full`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
