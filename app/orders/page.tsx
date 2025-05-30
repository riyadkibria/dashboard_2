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
      {/* Fixed Sidebar */}
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
          padding: '1.5rem',
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: '#f3f4f6',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '1rem', color: '#000' }}>
          All User Orders
        </h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div
            style={{
              overflowX: 'auto',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '1rem',
            }}
          >
            <table
              style={{
                width: '100%',
                tableLayout: 'fixed',
                borderCollapse: 'collapse',
                fontSize: '12px',
                color: '#000',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                  <th style={{ ...headerStyle, width: '15%' }}>Name</th>
                  <th style={{ ...headerStyle, width: '30%' }}>Products</th>
                  <th style={{ ...headerStyle, width: '10%' }}>Price</th>
                  <th style={{ ...headerStyle, width: '25%' }}>Address</th>
                  <th style={{ ...headerStyle, width: '10%' }}>Mobile</th>
                  <th style={{ ...headerStyle, width: '15%' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, index) => (
                  <tr
                    key={o.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                    }}
                  >
                    <td style={{ ...cellStyle, width: '15%' }}>{o.name}</td>
                    <td style={{ ...cellStyle, width: '30%' }}>
                      <ul style={{ paddingLeft: '1rem', margin: 0, wordWrap: 'break-word' }}>
                        {o.productName.split(',').map((product, idx) => (
                          <li key={idx} style={{ listStyleType: 'disc', marginBottom: '2px' }}>
                            {product.trim()}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ ...cellStyle, width: '10%' }}>{o.productPrice}</td>
                    <td style={{ ...cellStyle, width: '25%' }}>{o.address}</td>
                    <td style={{ ...cellStyle, width: '10%' }}>{o.mobile}</td>
                    <td style={{ ...cellStyle, width: '15%' }}>
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
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
  padding: '10px 14px',
  fontWeight: 600,
  borderBottom: '1px solid #e5e7eb',
  whiteSpace: 'nowrap',
  color: '#000',
};

const cellStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid #e5e7eb',
  verticalAlign: 'top',
  fontSize: '12px',
  color: '#000',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
};
