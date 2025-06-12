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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`transition-all duration-300 ease-in-out p-6 ${
          isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Top Ordered Products
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalOrders" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table */}
              <div className="overflow-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3">Total Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{item.name}</td>
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


