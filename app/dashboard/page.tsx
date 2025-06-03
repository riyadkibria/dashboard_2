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

        // Orders already sorted by createdAt descending from API
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
        <Card icon={<ShoppingCart />} title="Total Orders" value={orderCount} bg="indigo" />

        {/* Total Sales */}
        <Card
          icon={<DollarSign />}
          title="Total Sales"
          value={totalSales !== null ? `৳${totalSales.toLocaleString()}` : 'Loading...'}
          bg="green"
        />

        {/* Total Customers */}
        <Card
          icon={<Users />}
          title="Total Customers"
          value={customerCount !== null ? customerCount : 'Loading...'}
          bg="blue"
        />
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
              <li key={order.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Date:{' '}
                    {order.createdAtFormatted || 'Unknown date'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Name:</span> {order.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Mobile:</span> {order.mobile || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Address:</span> {order.address || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Product:</span> {order.productName || 'N/A'}
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                    {order.productPrice || '৳0'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Reusable Card component
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
