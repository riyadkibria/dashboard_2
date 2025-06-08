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

  if (loading) return (
    <p style={{
      padding: '40px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      fontSize: '18px',
      color: '#6b7280', // soft gray
      textAlign: 'center',
    }}>
      Loading...
    </p>
  );

  return (
    <div style={{
      maxWidth: '720px',
      margin: '40px auto',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      color: '#374151', // dark gray-blue
      backgroundColor: '#f9fafb', // very soft off-white
      borderRadius: '12px',
      padding: '32px 40px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
    }}>
      <h1 style={{
        fontWeight: '700',
        fontSize: '2.25rem',
        marginBottom: '24px',
        color: '#111827', // almost black
      }}>
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p style={{
          fontSize: '16px',
          color: '#6b7280', // soft gray
          textAlign: 'center',
          padding: '40px 0',
        }}>
          No orders found.
        </p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              padding: '20px 24px',
              borderRadius: '8px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)')}
          >
            <p style={{ margin: '4px 0', fontWeight: 600 }}>Name: <span style={{ fontWeight: 400 }}>{order.name}</span></p>
            <p style={{ margin: '4px 0', fontWeight: 600 }}>Mobile: <span style={{ fontWeight: 400 }}>{order.mobile}</span></p>
            <p style={{ margin: '4px 0', fontWeight: 600 }}>Address: <span style={{ fontWeight: 400 }}>{order.address}</span></p>
            <p style={{ margin: '4px 0', fontWeight: 600 }}>Product: <span style={{ fontWeight: 400 }}>{order.productName}</span></p>
            <p style={{ margin: '4px 0', fontWeight: 600 }}>Price: <span style={{ fontWeight: 400 }}>{order.productPrice}</span></p>
            <p style={{ margin: '4px 0', fontWeight: 600 }}>
              Created At: <span style={{ fontWeight: 400 }}>
                {order.createdAt ? order.createdAt.toDate().toLocaleString() : 'N/A'}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
