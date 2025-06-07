"use client";
import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../../lib/fetchOrders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const data = await fetchAllOrders();
      setOrders(data);
    }
    loadOrders();
  }, []);

  return (
    <div>
      <h1>All Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      <ul>
        {orders.map(order => (
          <li key={`${order.userId}_${order.orderId}`}>
            <strong>User ID:</strong> {order.userId} <br />
            <strong>Order ID:</strong> {order.orderId} <br />
            <pre>{JSON.stringify(order, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
