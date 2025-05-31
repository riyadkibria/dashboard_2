'use client';

import { useEffect, useState } from 'react';
import { collectionGroup, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import { FaShoppingBag, FaTag, FaPhone, FaTrash } from 'react-icons/fa';

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

  // 🔥 Remove order from Firestore and state
  const handleDelete = async (order: Order) => {
    try {
      const orderRef = doc(db, `users/${order.userId}/orders/${order.id}`);
      await deleteDoc(orderRef);

      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
    } catch (error) {
      console.error('❌ Error deleting order:', error);
    }
  };

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
          padding: '1.5rem',
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: '#f3f4f6',
          transition: 'margin-left 0.3s ease',
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
                  <th style={{ ...headerStyle, width: '12%' }}>Name</th>
                  <th style={{ ...headerStyle, width: '24%' }}>Products</th>
                  <th style={{ ...headerStyle, width: '18%' }}>Price</th>
                  <th style={{ ...headerStyle, width: '18%' }}>Address</th>
                  <th style={{ ...headerStyle, width: '10%' }}>Mobile</th>
                  <th style={{ ...headerStyle, width: '10%' }}>Date</th>
                  <th style={{ ...headerStyle, width: '8%' }}>Actions</th>
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
                    <td style={cellStyle}>{o.name}</td>

                    {/* Products stacked */}
                    <td style={cellStyle}>
                      <ul style={{ paddingLeft: 0, margin: 0, listStyleType: 'none' }}>
                        {o.productName.split(',').map((product, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '4px',
                            }}
                          >
                            <FaShoppingBag
                              style={{ marginRight: '6px', color: '#4A90E2', minWidth: '16px' }}
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
                              marginBottom: '4px',
                            }}
                          >
                            <FaTag
                              style={{ marginRight: '6px', color: '#E94E77', minWidth: '16px' }}
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
                        gap: '6px',
                      }}
                    >
                      <FaPhone style={{ color: '#34D399' }} />
                      {o.mobile}
                    </td>

                    <td style={cellStyle}>
                      {new Date(o.createdAt).toLocaleString()}
                    </td>

                    {/* 🗑️ Remove button */}
                    <td style={cellStyle}>
                      <button
                        onClick={() => handleDelete(o)}
                        style={{
                          backgroundColor: '#F87171',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                        }}
                      >
                        <FaTrash /> Remove
                      </button>
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
