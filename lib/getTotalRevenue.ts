import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

/**
 * Fetches all orders and calculates total revenue by summing Product-Price * Quantity for each order.
 */
export async function getTotalRevenue(): Promise<number> {
  const snapshot = await getDocs(collection(db, "user_request"));
  let total = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    const price = parseFloat(data["Product-Price"]);
    const quantity = parseInt(data["Quantity"]);

    if (!isNaN(price) && !isNaN(quantity)) {
      total += price * quantity;
    }
  });

  return total;
}
