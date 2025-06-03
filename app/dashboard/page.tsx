'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Users } from 'lucide-react';

export default function DashboardHome() {
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [salesRes, customersRes] = await Promise.all([
          fetch('/api/total-sales', { cache: 'no-store' }),
          fetch('/api/total-customers', { cache: 'no-store' }),
        ]);

        const salesData = await salesRes.json();
        const customerData = await customersRes.json();

        setTotalSales(salesData.totalSales ?? 0);
        setOrderCount(salesData.orderCount ?? 0);
        setCustomerCount(customerData.totalCustomers ?? 0);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
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
