
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl animate-pulse">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
          Customer Orders
        </h1>

        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li
                key={index}
                className="border rounded-lg p-4 bg-gray-50 hover:bg-white transition duration-200 shadow-sm"
              >
                <p className="text-lg font-medium text-gray-800">
                  🧾 Name:{" "}
                  <span className="font-semibold text-blue-600">
                    {typeof order.Name === "string" ? order.Name : "No name"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  ⏰ Time:{" "}
                  {order.Time instanceof Timestamp
                    ? order.Time.toDate().toLocaleString()
                    : "No time"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
}
