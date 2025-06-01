'use client';

import { useEffect, useState } from 'react';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import { FaShoppingBag, FaTag, FaPhone } from 'react-icons/fa';

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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: isCollapsed ? '80px' : '250px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#111827',
          color: '#fff',
          borderRight: '1px solid #1f2937',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: isCollapsed ? '80px' : '250px',
          padding: '2rem',
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: '#f9fafb',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827' }}>
          All User Orders
        </h1>

        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No orders found.</p>
        ) : (
          <div
            style={{
              overflowX: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              padding: '1.5rem',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 8px',
                fontSize: '14px',
                color: '#374151',
                minWidth: '700px',
              }}
            >
              <thead>
                <tr>
                  <th style={headerStyle}>Name</th>
                  <th style={headerStyle}>Products</th>
                  <th style={headerStyle}>Price</th>
                  <th style={headerStyle}>Address</th>
                  <th style={headerStyle}>Mobile</th>
                  <th style={headerStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, index) => (
                  <tr
                    key={o.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f3f4f6' : '#ffffff',
                      borderRadius: '10px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <td style={{ ...cellStyle, borderRadius: '10px 0 0 10px' }}>{o.name}</td>

                    {/* Products stacked */}
                    <td style={cellStyle}>
                      <ul style={{ paddingLeft: 0, margin: 0, listStyleType: 'none' }}>
                        {o.productName.split(',').map((product, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '6px',
                            }}
                          >
                            <FaShoppingBag
                              style={{ marginRight: '8px', color: '#2563eb', minWidth: '18px' }}
                            />
                            <span>{product.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Prices stacked */}
                    <td style={cellStyle}>
                      <ul style={{ paddingLeft: 0, margin: 0, listStyleType: 'none' }}>
                        {o.productPrice.split(',').map((priceStr, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '6px',
                            }}
                          >
                            <FaTag
                              style={{ marginRight: '8px', color: '#db2777', minWidth: '18px' }}
                            />
                            <span>{priceStr.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td style={cellStyle}>{o.address}</td>

                    <td
                      style={{
                        ...cellStyle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none', // No underline
                        color: '#111827',
                        fontWeight: 600,
                      }}
                    >
                      <FaPhone style={{ color: '#10b981', minWidth: '18px' }} />
                      <span>{o.mobile}</span>
                    </td>

                    <td style={{ ...cellStyle, borderRadius: '0 10px 10px 0' }}>
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
  padding: '12px 16px',
  fontWeight: 700,
  color: '#6b7280',
  textTransform: 'uppercase',
  fontSize: '12px',
  letterSpacing: '0.05em',
  userSelect: 'none',
  textAlign: 'left',
};

const cellStyle: React.CSSProperties = {
  padding: '14px 16px',
  verticalAlign: 'top',
  fontSize: '14px',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  color: '#374151',
};
