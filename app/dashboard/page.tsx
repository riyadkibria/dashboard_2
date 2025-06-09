"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getLatestOrders, UserRequest } from "@/lib/latestorders";
import getTotalOrders from "@/lib/getTotalOrders";

export default function DashboardPage() {
  const [orders, setOrders] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await getLatestOrders(5);
      setOrders(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`transition-all duration-300 ease-in-out p-6 ${
          isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
        }`}
      >
        {/* Main Dashboard Background */}
        <div className="w-full min-h-[85vh] bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Admin Dashboard
          </h1>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Latest Orders */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Latest 5 Orders
              </h2>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs text-left text-gray-700">
                    <thead className="bg-gray-100 text-[11px] uppercase text-gray-600">
                      <tr>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Phone</th>
                        <th className="px-3 py-2">Product</th>
                        <th className="px-3 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-[13px]">{order["Customer-Name"]}</td>
                          <td className="px-3 py-2 text-[13px]">{order["Phone-Number"]}</td>
                          <td className="px-3 py-2 text-[13px]">{order["Product-Name"]}</td>
                          <td className="px-3 py-2 text-[13px]">{order["Product-Price"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Card 2: Placeholder Stat */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Overview Stats
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {/* Sub-card: Placeholder */}
                <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Another Stat</p>
                  <p className="text-xl font-bold text-gray-800">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
