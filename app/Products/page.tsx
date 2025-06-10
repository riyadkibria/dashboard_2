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
  Cell,
} from "recharts";

export default function ProductsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [products, setProducts] = useState<
    { name: string; totalOrders: number }[]
  >([]);

  useEffect(() => {
    getTopOrderedProducts().then(setProducts);
  }, []);

  // Define colors for bars with a nice gradient effect
  const barColors = ["#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE"];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 transition-all duration-300">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 bg-white border-r shadow-md`}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Top Ordered Products</h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>

        {/* Container for chart and table side-by-side */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Bar Chart */}
          {products.length > 0 && (
            <div className="w-full md:w-1/2 h-96 bg-white rounded-2xl shadow-lg p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={products}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#4B5563", fontWeight: 600 }}
                    axisLine={{ stroke: "#CBD5E1" }}
                  />
                  <YAxis
                    tick={{ fill: "#4B5563", fontWeight: 600 }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      borderColor: "#E5E7EB",
                      boxShadow:
                        "0 2px 6px rgba(0, 0, 0, 0.12)",
                      fontWeight: 600,
                    }}
                    cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                  />
                  <Bar
                    dataKey="totalOrders"
                    radius={[8, 8, 0, 0]}
                    barSize={28}
                    background={{ fill: "#f3f4f6" }}
                  >
                    {products.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Table */}
          {products.length === 0 ? (
            <p className="text-sm text-gray-500">No products found.</p>
          ) : (
            <div className="w-full md:w-1/2 overflow-x-auto">
              <table className="w-full table-auto bg-white rounded-2xl shadow-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold tracking-wide">
                      Product Name
                    </th>
                    <th className="text-left px-6 py-4 font-semibold tracking-wide">
                      Total Orders
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr
                      key={product.name}
                      className={`border-t hover:bg-gray-50 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {product.totalOrders.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
