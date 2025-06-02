'use client';

import { useEffect, useState } from 'react';

interface Order {
  id: string;
  price: number;
  // Add other fields if needed
}

export default function DashboardHome() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);

      const total = data.reduce((sum: number, order: Order) => sum + order.price, 0);
      setTotalPrice(total);
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-gray-800 font-semibold text-xl mb-4">Dashboard Overview</h1>

      {/* Use orders here to fix ESLint error */}
      <p className="text-sm text-gray-500 mb-4">Total Orders: {orders.length}</p>

      <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm">
        <h2 className="text-gray-600 text-md">Total Sales</h2>
        <p className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

