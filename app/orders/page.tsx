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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'Segoe UI, sans-serif' }}>
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
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '1.5rem', color: '#111827' }}>
          🛒 All User Orders
        </h1>

        {loading ? (
          <p style={{ fontSize: '14px' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ fontSize: '14px' }}>No orders found.</p>
        ) : (
          <div
            style={{
              overflowX: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              padding: '1.5rem',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
                color: '#111827',
                minWidth: '800px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
                  <th style={{ ...headerStyle, width: '14%' }}>Name</th>
                  <th style={{ ...headerStyle, width: '28%' }}>Products</th>
                  <th style={{ ...headerStyle, width: '20%' }}>Price</th>
                  <th style={{ ...headerStyle, width: '18%' }}>Address</th>
                  <th style={{ ...headerStyle, width: '10%' }}>Mobile</th>
                  <th style={{ ...headerStyle, width: '10%' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, index) => (
                  <tr
                    key={o.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                      transition: 'background 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget.style.backgroundColor = '#e5e7eb');
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? '#ffffff' : '#f9fafb';
                    }}
                  >
                    <td style={cellStyle}>{o.name}</td>

                    {/* Products */}
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

                    {/* Prices */}
                    <td style={cellStyle}>
                      <ul style={listStyle}>
                        {o.productPrice.split(',').map((price, idx) => (
                          <li key={idx} style={listItemStyle}>
                            <FaTag style={iconStyle('#EF4444')} />
                            <span>{price.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td style={cellStyle}>{o.address}</td>

                    <td style={{ ...cellStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaPhone style={{ color: '#10B981' }} />
                      {o.mobile}
                    </td>

                    <td style={cellStyle}>
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

// Styles
const headerStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontWeight: 700,
  borderBottom: '2px solid #e5e7eb',
  fontSize: '13px',
  color: '#374151',
};

const cellStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #e5e7eb',
  verticalAlign: 'top',
  wordWrap: 'break-word',
  color: '#1f2937',
};

const listStyle: React.CSSProperties = {
  padding: 0,
  margin: 0,
  listStyleType: 'none',
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6px',
};

const iconStyle = (color: string): React.CSSProperties => ({
  marginRight: '8px',
  color,
  minWidth: '16px',
});
