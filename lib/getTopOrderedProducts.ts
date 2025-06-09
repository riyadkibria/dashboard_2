import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export interface ProductOrderStat {
  name: string;
  count: number;
}

export async function getTopOrderedProducts(): Promise<ProductOrderStat[]> {
  const snapshot = await getDocs(collection(db, "user_request"));

  const productCountMap: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const productName = data["Product-Name"];
    const quantity = parseInt(data["Quantity"]);

    if (productName && !isNaN(quantity)) {
      productCountMap[productName] = (productCountMap[productName] || 0) + quantity;
    }
  });

  // Convert map to array and sort by count in descending order
  const sortedProducts: ProductOrderStat[] = Object.entries(productCountMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return sortedProducts;
}
