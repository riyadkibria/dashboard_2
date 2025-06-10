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

export default function ProductsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [products, setProducts] = useState<
    { name: string; totalOrders: number }[]
  >([]);

  useEffect(() => {
    getTopOrderedProducts().then(setProducts);
  }, []);

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

        {/* Bar Chart */}
        {products.length > 0 && (
          <div className="w-full md:w-3/4 h-96 mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={products} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalOrders" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Table */}
        {products.length === 0 ? (
          <p className="text-sm text-gray-500">No products found.</p>
        ) : (
          <div className="w-full md:w-1/2">
            <table className="w-full table-auto bg-white rounded-xl shadow-md overflow-hidden text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3">Product Name</th>
                  <th className="text-left px-4 py-3">Total Orders</th>
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
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {product.totalOrders}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
