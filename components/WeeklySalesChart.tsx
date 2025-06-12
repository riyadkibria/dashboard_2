"use client";

import { useEffect, useState } from "react";
import { getWeeklySales } from "@/lib/getWeeklySales";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklySalesChart() {
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

  if (loading) return <p className="text-xs text-gray-500">Loading chart...</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
