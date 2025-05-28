'use client';

import { useEffect, useState } from 'react';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

          // ✅ Extract userId from the Firestore path: users/{userId}/orders/{orderId}
          const pathSegments = doc.ref.path.split('/');
          const userId = pathSegments[1] || 'unknown';

          return {
            id: doc.id,
            userId,
            name: data.name || '',
            productName: data.productName || '',
            productPrice: data.productPrice || '',
            address: data.address || '',
            mobile: data.mobile || '',
            createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
          };
        });

        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>All User Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Order ID</th>
              <th>Name</th>
              <th>Product</th>
              <th>Price</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.userId}</td>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.productName}</td>
                <td>{o.productPrice}</td>
                <td>{o.address}</td>
                <td>{o.mobile}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
