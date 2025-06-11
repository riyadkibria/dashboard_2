// components/WeeklySalesChart.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";  // Make sure this path is correct
import { collection, getDocs } from "firebase/firestore";
import { startOfWeek, format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklySalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const snapshot = await getDocs(collection(db, "user_request"));
      const weeklyMap = new Map();

      snapshot.forEach((doc) => {
        const docData = doc.data();
        const quantity = docData.Quantity || 0;
        const price = docData["Product-Price"] || 0;
        const timestamp = docData.Time;

        if (!timestamp) return; // skip if no timestamp

        const date = timestamp.toDate(); // convert Firestore timestamp to JS Date
        // get the start of the week (Sunday as start)
        const weekStart = startOfWeek(date, { weekStartsOn: 0 });
        const weekKey = format(weekStart, "yyyy-MM-dd");

        const totalSale = quantity * price;
        weeklyMap.set(weekKey, (weeklyMap.get(weekKey) || 0) + totalSale);
      });

      // Convert map to array and sort by week start date
      const chartData = Array.from(weeklyMap.entries())
        .map(([week, total]) => ({ week, total }))
        .sort((a, b) => new Date(a.week) - new Date(b.week));

      setData(chartData);
    };

    fetchAndProcessData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklySalesChart;
