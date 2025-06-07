// pages/dashboard.tsx

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collectionGroup,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

type Order = {
  id: string;            // Order document ID
  address: string;
  createdAt: any;        // Firestore Timestamp
  mobile: string;
  name: string;
  productName: string;
  productPrice: number;
  userId: string;        // The parent user document ID (extracted below)
};

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // Query all orders from all users using collectionGroup
        const ordersQuery = query(
          collectionGroup(db, "orders"),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(ordersQuery);

        const ordersList: Order[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          // Extract userId from the document path: users/{userId}/orders/{orderId}
          const pathSegments = doc.ref.path.split("/");
          const userId = pathSegments[1]; // 0:'users',1:'userId',2:'orders',3:'orderId'

          return {
            id: doc.id,
            address: data.address,
            createdAt: data.createdAt,
            mobile: data.mobile,
            name: data.name,
            productName: data.productName,
            productPrice: data.productPrice,
            userId,
          };
        });

        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  if (loading) return <p>Loading all orders...</p>;

  return (
    <div>
      <h1>All Users' Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: "20px" }}>
              <p><strong>User ID:</strong> {order.userId}</p>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Mobile:</strong> {order.mobile}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Product:</strong> {order.productName}</p>
              <p><strong>Price:</strong> ${order.productPrice}</p>
              <p>
                <strong>Ordered At:</strong>{" "}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
