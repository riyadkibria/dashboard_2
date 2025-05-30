'use client';

import { useEffect, useState } from 'react';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';

interface Order {
  id: string;
  userId: string;
  name: string;
  productName: string;
  productPrice: string;
  address: string;
  mobile: string;
  createdAt: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const snapshot = await getDocs(collectionGroup(db, 'orders'));
        const fetchedOrders: Order[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const pathSegments = doc.ref.path.split('/');
          const userId = pathSegments[1] || 'unknown';

          return {
            id: doc.id,
            userId,
            name: typeof data.name === 'string' ? data.name : '',
            productName: typeof data.productName === 'string' ? data.productName : '',
            productPrice: typeof data.productPrice === 'string' ? data.productPrice : '',
            address: typeof data.address === 'string' ? data.address : '',
            mobile: typeof data.mobile === 'string' ? data.mobile : '',
            createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
          };
        });

        setOrders(fetchedOrders);
      } catch (error) {
        console.error('❌ Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#111827',
          color: '#fff',
          borderRight: '1px solid #1f2937',
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: '250px',
          padding: '2rem',
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: '#f9fafb',
        }}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '1.5rem', color: '#111' }}>
          All User Orders
        </h1>

        {loading ? (
          <p style={{ color: '#111' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: '#111' }}>No orders found.</p>
        ) : (
          <div
            style={{
              overflowX: 'auto',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              padding: '1rem',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '1000px',
                fontSize: '13px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left', color: '#111' }}>
                  <th style={{ ...headerStyle, width: '100px' }}>User ID</th>
                  <th style={{ ...headerStyle, width: '100px' }}>Order ID</th>
                  <th style={{ ...headerStyle, width: '160px' }}>Name</th>
                  <th style={{ ...headerStyle, width: '220px' }}>Products</th>
                  <th style={{ ...headerStyle, width: '140px' }}>Price</th>
                  <th style={{ ...headerStyle, width: '200px' }}>Address</th>
                  <th style={headerStyle}>Mobile</th>
                  <th style={headerStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, index) => (
                  <tr
                    key={o.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f3f4f6',
                      color: '#000',
                    }}
                  >
                    <td style={cellStyle}>{o.userId}</td>
                    <td style={cellStyle}>{o.id}</td>
                    <td style={cellStyle}>{o.name}</td>
                    <td style={{ ...cellStyle, paddingLeft: '1rem' }}>
                      <ul style={{ margin: 0, padding: 0, listStyleType: 'disc' }}>
                        {o.productName.split(',').map((product, idx) => (
                          <li key={idx} style={{ marginBottom: '2px' }}>
                            {product.trim()}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={cellStyle}>{o.productPrice}</td>
                    <td style={cellStyle}>{o.address}</td>
                    <td style={cellStyle}>{o.mobile}</td>
                    <td style={cellStyle}>{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontWeight: 600,
  borderBottom: '1px solid #e5e7eb',
  whiteSpace: 'nowrap',
  fontSize: '13px',
};

const cellStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #e5e7eb',
  verticalAlign: 'top',
  color: '#000',
  fontSize: '13px',
};
