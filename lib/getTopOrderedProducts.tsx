
// lib/getTopOrderedProducts.ts
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getTopOrderedProducts() {
  const snapshot = await getDocs(collection(db, "orders"));
  const productTotals: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const products = data.products || [];

    products.forEach((item: { productName: string; quantity: number }) => {
      const name = item.productName;
      const qty = item.quantity || 0;

      if (productTotals[name]) {
        productTotals[name] += qty;
      } else {
        productTotals[name] = qty;
      }
    });
  });

  const result = Object.entries(productTotals).map(([name, totalOrders]) => ({
    name,
    totalOrders,
  }));

  return result.sort((a, b) => b.totalOrders - a.totalOrders);
}
