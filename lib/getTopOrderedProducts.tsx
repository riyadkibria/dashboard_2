// lib/getTopOrderedProducts.ts
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

type ProductStats = {
  name: string;
  totalOrders: number;
  totalQuantity: number;
};

export async function getTopOrderedProducts(): Promise<ProductStats[]> {
  const snapshot = await getDocs(collection(db, "user_request"));

  const productStats: Record<string, { totalOrders: number; totalQuantity: number }> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const productName = data["Product-Name"];
    const quantity = data["Quantity"];

    if (typeof productName === "string" && typeof quantity === "number") {
      if (!productStats[productName]) {
        productStats[productName] = {
          totalOrders: 0,
          totalQuantity: 0,
        };
      }

      productStats[productName].totalOrders += 1;       // Count this as one order
      productStats[productName].totalQuantity += quantity; // Sum the quantity
    }
  });

  const result: ProductStats[] = Object.entries(productStats).map(([name, stats]) => ({
    name,
    totalOrders: stats.totalOrders,
    totalQuantity: stats.totalQuantity,
  }));

  // Sort by total orders descending
  return result.sort((a, b) => b.totalOrders - a.totalOrders);
}
