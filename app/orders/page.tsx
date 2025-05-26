'use client';

import { useEffect, useState } from 'react';
import { getUserOrders, Order } from '@/pages/api/getOrders';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const userId = 'your-user-id-here';
    getUserOrders(userId).then((data) => {
      setOrders(data);
    });
  }, []);

  return (
    <div>
      <h2>User Orders</h2>
      {orders.map((order) => (
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
