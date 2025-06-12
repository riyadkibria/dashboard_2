// lib/getWeeklySales.ts
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { startOfWeek, format } from "date-fns";

interface WeeklySales {
  week: string;
  total: number;
}

export async function getWeeklySales(): Promise<WeeklySales[]> {
  const snapshot = await getDocs(collection(db, "user_request"));
  const weeklyMap: { [week: string]: number } = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const price = Number(data["Product-Price"]);
    const quantity = Number(data["Quantity"]);
    const timestamp = data["Time"]?.toDate?.(); // Firebase Timestamp → JS Date

    if (!price || !quantity || !timestamp) return;

    const weekStart = startOfWeek(timestamp, { weekStartsOn: 1 }); // Monday start
    const weekLabel = format(weekStart, "yyyy-MM-dd");

    const value = price * quantity;
    weeklyMap[weekLabel] = (weeklyMap[weekLabel] || 0) + value;
  });

  // Convert to array and sort by week
  return Object.entries(weeklyMap)
    .map(([week, total]) => ({ week, total }))
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());
}
