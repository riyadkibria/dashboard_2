"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getTopOrderedProducts } from "@/lib/getTopOrderedProducts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaBoxOpen } from "react-icons/fa"; // Icon for product

interface ProductData {
  name: string;
  totalOrders: number;
}

export default function ProductsPage() {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTopOrderedProducts();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`transition-all duration-300 ease-in-out p-6 ${
          isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Top Ordered Products
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                    barCategoryGap={16}
                  >
                    <CartesianGrid strokeDasharray="2 4" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      wrapperStyle={{ fontSize: "0.85rem" }}
                      contentStyle={{
                        borderRadius: "8px",
                        borderColor: "#e5e7eb",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                    />
                    <Bar
                      dataKey="totalOrders"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table */}
              <div className="overflow-auto border border-gray-200 rounded-xl shadow-sm bg-white">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-medium">
                    <tr>
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-left">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 font-medium flex items-center gap-2">
                          <FaBoxOpen className="text-yellow-500 w-4 h-4" />
                          <span>{item.name}</span>
                        </td>
                        <td className="px-4 py-2">{item.totalOrders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

