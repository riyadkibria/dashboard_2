'use client';

import { useEffect, useState } from 'react';
import { getUserOrders, Order } from '@/pages/api/getOrders';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // fixed double slash

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserOrders(user.uid).then((data) => {
          setOrders(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
        console.warn('No user found');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>User Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Product:</strong> {order.productName} (${order.productPrice})</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Mobile:</strong> {order.mobile}</p>
            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
