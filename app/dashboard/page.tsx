"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getLatestOrders, UserRequest } from "@/lib/getLatestorders";
import { getTotalOrders } from "@/lib/getTotalOrders";
import { getTotalRevenue } from "@/lib/getTotalRevenue";
import WeeklySalesChart from "@/components/WeeklySalesChart";

// Icons
import { FaUser, FaPhone, FaBoxOpen, FaDollarSign } from "react-icons/fa";

export default function DashboardPage() {
  const [orders, setOrders] = useState<UserRequest[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const latestOrders = await getLatestOrders(5);
      const total = await getTotalOrders();
      const revenue = await getTotalRevenue();
      setOrders(latestOrders);
      setTotalOrders(total);
      setTotalRevenue(revenue);
      setLoading(false);
    };
    fetchData();
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
                          <td className="px-3 py-2 text-[13px] flex items-center gap-2">
                            <FaUser className="text-indigo-600 w-4 h-4" />
                            {order["Customer-Name"]}
                          </td>
                          <td className="px-3 py-2 text-[13px] flex items-center gap-2">
                            <FaPhone className="text-green-600 w-4 h-4" />
                            {order["Phone-Number"]}
                          </td>
                          <td className="px-3 py-2 text-[13px] flex items-center gap-2">
                            <FaBoxOpen className="text-yellow-600 w-4 h-4" />
                            {order["Product-Name"]}
                          </td>
                          <td className="px-3 py-2 text-[13px] flex items-center gap-2">
                            <FaDollarSign className="text-green-700 w-4 h-4" />
                            ${order["Product-Price"]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Card 2: Total Orders */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Total Orders
              </h2>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : (
                <p className="text-4xl font-bold text-indigo-600">{totalOrders}</p>
              )}
            </div>

            {/* Card 3: Total Revenue */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Total Revenue
              </h2>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : (
                <p className="text-4xl font-bold text-green-600">
                  ${totalRevenue.toFixed(2)}
                </p>
              )}
            </div>

            {/* Card 4: Weekly Sales Chart */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5 md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Weekly Sales Overview
              </h2>
              <WeeklySalesChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
