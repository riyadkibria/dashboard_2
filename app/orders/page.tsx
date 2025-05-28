
'use client';

import { useEffect, useState } from 'react';
import { getAllOrders, Order } from '@/pages/api/getOrders'; // Make sure `getAllOrders` is exported

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Product Price</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-2 border font-mono text-xs">{order.id}</td>
                  <td className="p-2 border">{order.name}</td>
                  <td className="p-2 border">{order.productName}</td>
                  <td className="p-2 border">{order.productPrice}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">{order.mobile}</td>
                  <td className="p-2 border">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
