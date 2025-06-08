"use client";

import React, { useEffect, useState } from "react";
import { fetchAllOrders, Order } from "../../lib/fetchOrders";
import { Timestamp } from "firebase/firestore";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const data = await fetchAllOrders();
      setOrders(data);
    }
    loadOrders();
  }, []);

  const formatDate = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleString();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={`${order.userId}_${order.orderId}`}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <p><strong>User ID:</strong> {order.userId}</p>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Mobile:</strong> {order.mobile}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Product Name:</strong> {order.productName}</p>
              <p><strong>Product Price:</strong> {order.productPrice}</p>
              <p><strong>Created At:</strong> {formatDate(order.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
