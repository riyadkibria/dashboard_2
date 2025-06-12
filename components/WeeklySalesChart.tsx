"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getLatestOrders, UserRequest } from "@/lib/latestorders";
import { getTotalOrders } from "@/lib/getTotalOrders";
import { getTotalRevenue } from "@/lib/getTotalRevenue";
import WeeklySalesChart from "@/components/WeeklySalesChart";

export default function DashboardPage() {
  const [orders, setOrders] = useState<UserRequest[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const latestOrders = await getLatestOrders(5);
      const total = await getTotalOrders();
      const revenue = await getTotalRevenue();
      setOrders(latestOrders);
      setTotalOrders(total);
      setTotalRevenue(revenue);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`transition-all duration-300 ease-in-out p-4 ${
          isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
        }`}
      >
        <div className="w-full min-h-[75vh] bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
            Admin Dashboard
          </h1>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Latest Orders */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h2 className="text-md font-medium text-gray-900 mb-3">
                Latest 5 Orders
              </h2>
              {loading ? (
                <p className="text-xs text-gray-500">Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs text-left text-gray-700">
                    <thead className="bg-gray-100 text-[10px] uppercase text-gray-500">
                      <tr>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Phone</th>
                        <th className="px-2 py-1">Product</th>
                        <th className="px-2 py-1">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td className="px-2 py-1">{order["Customer-Name"]}</td>
                          <td className="px-2 py-1">{order["Phone-Number"]}</td>
                          <td className="px-2 py-1">{order["Product-Name"]}</td>
                          <td className="px-2 py-1">${order["Product-Price"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Card 2: Total Orders */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-center items-center">
              <h2 className="text-md font-medium text-gray-900 mb-3">Total Orders</h2>
              {loading ? (
                <p className="text-xs text-gray-500">Loading...</p>
              ) : (
                <p className="text-3xl font-bold text-indigo-600">{totalOrders}</p>
              )}
            </div>

            {/* Card 3: Total Revenue */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-center items-center">
              <h2 className="text-md font-medium text-gray-900 mb-3">Total Revenue</h2>
              {loading ? (
                <p className="text-xs text-gray-500">Loading...</p>
              ) : (
                <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
              )}
            </div>

            {/* Card 4: Weekly Sales Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm md:col-span-2">
              <h2 className="text-md font-medium text-gray-900 mb-3">Weekly Sales Overview</h2>
              <WeeklySalesChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
