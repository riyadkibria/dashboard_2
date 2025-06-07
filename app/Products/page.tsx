"use client";

import React, { useEffect, useState } from "react";
import { fetchNames, OrderData } from "../../lib/fetchNames";
import { Timestamp } from "firebase/firestore";

export default function ProductsPage() {
  const [allOrders, setAllOrders] = useState<OrderData[]>([]);
  const [latestTwoOrders, setLatestTwoOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await fetchNames();

      // Sort all orders by Time descending (newest first)
      const sorted = data
        .filter((order) => order.Time instanceof Timestamp)
        .sort(
          (a, b) =>
            (b.Time as Timestamp).toMillis() - (a.Time as Timestamp).toMillis()
        );

      setAllOrders(data); // all orders as-is (unsorted or sorted — your choice)
      setLatestTwoOrders(sorted.slice(0, 2)); // pick only the latest two
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Orders Overview</h1>

      {/* Block 1: All Orders */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
          All Orders ({allOrders.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allOrders.map((order, i) => (
            <div
              key={order.orderId || i}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <p>
                <strong>Name:</strong> {order.Name || "N/A"}
              </p>
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {order.Time instanceof Timestamp
                  ? order.Time.toDate().toLocaleString()
                  : "No timestamp"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Block 2: Latest 2 Orders */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Latest 2 Orders
        </h2>
        <div className="space-y-6">
          {latestTwoOrders.length === 0 && <p>No recent orders found.</p>}
          {latestTwoOrders.map((order, i) => (
            <div
              key={order.orderId || i}
              className="bg-white p-6 rounded-lg shadow-lg border-l-8 border-blue-500"
            >
              <p className="text-xl font-semibold mb-2">{order.Name || "N/A"}</p>
              <p className="text-gray-700 mb-1">
                Order ID: <span className="font-mono">{order.orderId}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Time:{" "}
                {order.Time instanceof Timestamp
                  ? order.Time.toDate().toLocaleString()
                  : "No timestamp"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
