import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getTopOrderedProducts() {
  const snapshot = await getDocs(collection(db, "user_request"));
  const productTotals: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const productName = data["Product-Name"];
    const quantity = data["Quantity"];

    if (typeof productName === "string" && typeof quantity === "number") {
      if (productTotals[productName]) {
        productTotals[productName] += quantity;
      } else {
        productTotals[productName] = quantity;
      }
    }
  });

  const result = Object.entries(productTotals).map(([name, totalOrders]) => ({
    name,
    totalOrders,
  }));

  return result.sort((a, b) => b.totalOrders - a.totalOrders);
}
