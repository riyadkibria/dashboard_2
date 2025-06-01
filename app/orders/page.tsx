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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: '#1f2937',
          }}
        >
          📦 All User Orders
        </h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div
            style={{
              overflowX: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              padding: '1.5rem',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 12px',
                fontSize: '13px',
              }}
            >
              <thead>
                <tr style={{ textAlign: 'left', color: '#374151' }}>
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
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <td style={cellStyle}>{o.name}</td>

                    <td style={cellStyle}>
                      <ul style={listStyle}>
                        {o.productName.split(',').map((product, idx) => (
                          <li key={idx} style={listItemStyle}>
                            <FaShoppingBag style={iconStyle('#3B82F6')} />
                            <span>{product.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td style={cellStyle}>
                      <ul style={listStyle}>
                        {o.productPrice.split(',').map((priceStr, idx) => (
                          <li key={idx} style={listItemStyle}>
                            <FaTag style={iconStyle('#F59E0B')} />
                            <span>{priceStr.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td style={cellStyle}>{o.address}</td>

                    <td style={cellStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaPhone style={iconStyle('#10B981')} />
                        <span>{o.mobile}</span>
                      </div>
                    </td>

                    <td style={cellStyle}>
                      {new Date(o.createdAt).toLocaleDateString()}{' '}
                      <br />
                      <span style={{ color: '#6b7280', fontSize: '11px' }}>
                        {new Date(o.createdAt).toLocaleTimeString()}
                      </span>
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
  fontSize: '13px',
  borderBottom: '1px solid #e5e7eb',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const cellStyle: React.CSSProperties = {
  padding: '14px 16px',
  borderBottom: '1px solid #f3f4f6',
  verticalAlign: 'top',
  color: '#1f2937',
  backgroundColor: '#ffffff',
  fontSize: '13px',
};

const listStyle: React.CSSProperties = {
  paddingLeft: 0,
  margin: 0,
  listStyleType: 'none',
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6px',
  gap: '6px',
};

const iconStyle = (color: string): React.CSSProperties => ({
  color,
  minWidth: '16px',
});

