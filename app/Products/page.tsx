"use client";

import React, { useEffect, useState } from "react";
import { fetchNames, OrderData } from "../../lib/fetchNames";
import { Timestamp } from "firebase/firestore";

export default function ProductsPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await fetchNames();
      setOrders(data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>Name:</strong>{" "}
              {typeof order.Name === "string" ? order.Name : "No name"} <br />
              <strong>Time:</strong>{" "}
              {order.Time instanceof Timestamp
                ? order.Time.toDate().toLocaleString()
                : "No time"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
