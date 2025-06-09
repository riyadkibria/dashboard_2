"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getLatestOrders, UserRequest } from "@/lib/latestorders";

export default function ProductsPage() {
  const [orders, setOrders] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getLatestOrders(); // fetch all, no limit
        setOrders(allOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`transition-all duration-300 ease-in-out p-6 ${
          isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
        }`}
      >
        <div className="w-full min-h-[85vh] bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            All Product Orders
          </h1>

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-gray-500">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left text-gray-700">
                <thead className="bg-gray-100 text-[11px] uppercase text-gray-600">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Phone</th>
                    <th className="px-3 py-2">Product</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 text-[13px]">{order["Customer-Name"]}</td>
                      <td className="px-3 py-2 text-[13px]">{order["Phone-Number"]}</td>
                      <td className="px-3 py-2 text-[13px]">{order["Product-Name"]}</td>
                      <td className="px-3 py-2 text-[13px]">${order["Product-Price"]}</td>
                      <td className="px-3 py-2 text-[13px]">{order["Customer-Address"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
