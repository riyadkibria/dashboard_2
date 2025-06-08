'use client';

import { useEffect, useState } from 'react';
import { fetchLatestOrders, Order } from '../../lib/fetchLatestOrders';
import { Timestamp } from 'firebase/firestore';

export default function OverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchLatestOrders();
      console.log('Latest Orders:', data); // 🔍 Debug log
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>
        Latest 5 Orders
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <thead style={{ backgroundColor: '#f3f4f6' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{order.name}</td>
                <td style={{ padding: '12px' }}>{order.productName}</td>
                <td style={{ padding: '12px' }}>{order.productPrice}</td>
                <td style={{ padding: '12px' }}>
                  {order.createdAt instanceof Timestamp
                    ? order.createdAt.toDate().toLocaleString()
                    : 'No timestamp'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
