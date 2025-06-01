'use client';

import { useEffect, useState } from 'react';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import { FaShoppingBag, FaPhone } from 'react-icons/fa';

interface Order {
  id: string;
  userId: string;
  name: string;
  productName: string;
  productPrice: string;
  productQuantity: string; // <-- new field
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
            productQuantity: typeof data.productQuantity === 'string' ? data.productQuantity : '',
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
                fontSize: '13px',
                color: '#000',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                  <th style={{ ...headerStyle, width: '14%' }}>Name</th>
                  <th style={{ ...headerStyle, width: '26%' }}>Products (Qty)</th>
                  <th style={{ ...headerStyle, width: '20%' }}>Price</th>
                  <th style={{ ...headerStyle, width: '15%' }}>Address</th>
                  <th style={{ ...headerStyle, width: '10%' }}>Mobile</th>
                  <th style={{ ...headerStyle, width: '15%' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const names = o.productName.split(',').map((n) => n.trim());
                  const prices = o.productPrice.split(',').map((p) => p.trim());
                  const quantities = o.productQuantity.split(',').map((q) => q.trim());

                  const productList = names.map((name, i) => `${name}(${quantities[i] || '1'})`).join(', ');

                  const priceList = prices.map((priceStr, i) => {
                    const quantity = parseInt(quantities[i] || '1');
                    const unitPrice = parseInt(priceStr || '0');
                    const total = unitPrice * quantity;
                    return `৳${unitPrice} x ${quantity} = ৳${total}`;
                  });

                  return (
                    <tr key={o.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={cellStyle}>{o.name}</td>
                      <td style={{ ...cellStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaShoppingBag style={{ color: '#4A90E2' }} />
                        <span>{productList}</span>
                      </td>
                      <td style={cellStyle}>
                        {priceList.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </td>
                      <td style={cellStyle}>{o.address}</td>
                      <td style={{ ...cellStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaPhone style={{ color: '#34D399' }} />
                        {o.mobile}
                      </td>
                      <td style={cellStyle}>{new Date(o.createdAt).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  padding: '12px 14px',
  fontWeight: 600,
  borderBottom: '1px solid #e5e7eb',
  color: '#000',
  backgroundColor: '#f3f4f6',
};

const cellStyle: React.CSSProperties = {
  padding: '12px 14px',
  verticalAlign: 'top',
  fontSize: '13px',
  color: '#000',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
};


