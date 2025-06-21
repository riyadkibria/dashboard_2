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
            <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Latest 5 Orders
              </h2>

              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : orders.length === 0 ? (
                <p className="text-sm text-gray-500">No recent orders.</p>
              ) : (
                <table className="w-full border border-gray-200 text-sm text-gray-700 table-fixed">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left w-1/4">Customer</th>
                      <th className="px-6 py-3 text-left w-1/4">Phone</th>
                      <th className="px-6 py-3 text-left w-1/4">Product</th>
                      <th className="px-6 py-3 text-left w-1/4">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.map((order, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                          <FaUser className="inline-block text-indigo-500 mr-2" />
                          {order["Customer-Name"]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                          <FaPhone className="inline-block text-green-500 mr-2" />
                          {order["Phone-Number"]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                          <FaBoxOpen className="inline-block text-yellow-500 mr-2" />
                          {order["Product-Name"]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                          <FaDollarSign className="inline-block text-emerald-500 mr-2" />
                          ${order["Product-Price"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
