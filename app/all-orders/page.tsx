'use client';

import { useEffect, useState } from 'react';
import { fetchOrders, Order } from '../../lib/fetchOrders';

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      const allOrders = await fetchOrders();
      setOrders(allOrders);
      setLoading(false);
    };

    getOrders();
  }, []);

  if (loading) return <p style={{ padding: '20px' }}>Loading...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>All Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order, index) => (
        <div
          key={index}
          style={{
            marginBottom: '20px',
            borderBottom: '1px solid #ccc',
            paddingBottom: '10px',
          }}
        >
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Mobile:</strong> {order.mobile}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Price:</strong> {order.productPrice}</p>
          <p><strong>Created At:</strong> {
            typeof order.createdAt?.toDate === 'function'
              ? order.createdAt.toDate().toLocaleString()
              : 'N/A'
          }</p>
        </div>
      ))}
    </div>
  );
}
