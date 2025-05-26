'use client';

import { useEffect, useState } from 'react';
import { getUserOrders } from '@/pages/api/getOrders';

type Order = {
  id: string;
  name: string;
  productName: string;
  productPrice: number;
  address: string;
  mobile: string;
  createdAt: string; // or Date if you're converting it
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]); // ✅ specify the type here

  useEffect(() => {
    const userId = 'your-user-id-here'; // Replace with actual user ID
    getUserOrders(userId).then(setOrders);
  }, []);

  return (
    <div>
      <h2>User Orders</h2>
      {orders.map(order => (
        <div key={order.id}>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Product:</strong> {order.productName} (${order.productPrice})</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Mobile:</strong> {order.mobile}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
