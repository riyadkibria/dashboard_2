"use client";

import { useEffect, useState } from "react";
import { getWeeklySales } from "@/lib/getWeeklySales";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeeklySalesChartAndTable() {
  const [data, setData] = useState<{ week: string; total: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      const weeklySales = await getWeeklySales();
      setData(weeklySales);
      setLoading(false);
    };
    fetchSales();
  }, []);

  if (loading)
    return <p className="text-xs text-gray-500 font-medium">Loading chart...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Weekly Sales Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 15, right: 20, left: 0, bottom: 40 }}
            barCategoryGap={16}
          >
            <CartesianGrid strokeDasharray="4 6" stroke="#e0e0e0" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #ddd",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                fontSize: 14,
              }}
              labelStyle={{ fontWeight: "bold", color: "#4f46e5" }}
            />
            <Bar
              dataKey="total"
              fill="#4f46e5"
              radius={[6, 6, 0, 0]}
              barSize={24}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-2xl shadow-md overflow-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Weekly Sales Table
        </h2>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-2">Week</th>
              <th className="px-4 py-2">Total Sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{item.week}</td>
                <td className="px-4 py-2">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
