// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from "react";
import { fetchAllOrders } from "@/lib/fetchAllOrders";

interface Order {
  orderId: string;
  userId: string;
  address: string;
  createdAt: any; // or Firebase Timestamp
  mobile: string;
  name: string;
  productName: string;
  productPrice: string;
}

const DashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchAllOrders();
      setOrders(data);
      setLoading(false);
    };
    getOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All User Orders</h1>
      {orders.map((order) => (
        <div key={order.orderId} className="border rounded-lg p-4 mb-4 shadow-sm">
          <p><strong>User ID:</strong> {order.userId}</p>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Mobile:</strong> {order.mobile}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Price:</strong> {order.productPrice}</p>
          <p><strong>Created At:</strong> {order.createdAt?.toDate?.().toLocaleString?.() ?? 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
