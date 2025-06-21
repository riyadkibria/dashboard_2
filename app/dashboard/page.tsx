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
            {/* Latest Orders */}
            <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Latest 5 Orders
              </h2>

              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : orders.length === 0 ? (
                <p className="text-sm text-gray-500">No recent orders.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left">Customer</th>
                        <th className="px-4 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders.map((order, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                            <FaUser className="text-indigo-500 w-4 h-4" />
                            <span>{order["Customer-Name"]}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                            <FaPhone className="text-green-500 w-4 h-4" />
                            <span>{order["Phone-Number"]}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                            <FaBoxOpen className="text-yellow-500 w-4 h-4" />
                            <span>{order["Product-Name"]}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                            <FaDollarSign className="text-emerald-500 w-4 h-4" />
                            <span>${order["Product-Price"]}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Total Orders */}
            <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Total Orders
              </h2>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : (
                <p className="text-4xl font-bold text-indigo-600">{totalOrders}</p>
              )}
            </div>

            {/* Total Revenue */}
            <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6">
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

            {/* Weekly Sales */}
            <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 md:col-span-2">
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
