"use client";

import React, { useEffect, useState } from "react";
import { getLatestOrders, UserRequest } from "@/lib/getLatestOrders";
import {
  UserIcon,
  PhoneIcon,
  PackageIcon,
  DollarSignIcon,
  MapPinIcon,
} from "lucide-react";

export default function LatestOrders() {
  const [orders, setOrders] = useState<UserRequest[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getLatestOrders();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, idx) => (
            <li
              key={idx}
              className="p-4 border rounded-lg shadow-sm bg-white space-y-2"
            >
              <div className="flex items-center gap-2 text-gray-800">
                <UserIcon className="w-4 h-4" />
                <span>{order["Customer-Name"]}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <PhoneIcon className="w-4 h-4" />
                <span>{order["Phone-Number"]}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <PackageIcon className="w-4 h-4" />
                <span>{order["Product-Name"]}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <DollarSignIcon className="w-4 h-4" />
                <span>{order["Product-Price"]}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <MapPinIcon className="w-4 h-4" />
                <span>{order["Customer-Address"]}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
