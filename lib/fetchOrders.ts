
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Define the Order type
export type Order = {
  userId: string;
  orderId: string;
  [key: string]: unknown;
};

export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const allOrders: Order[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const ordersSnapshot = await getDocs(collection(db, `users/${userId}/orders`));

      ordersSnapshot.forEach(orderDoc => {
        allOrders.push({
          userId,
          orderId: orderDoc.id,
          ...orderDoc.data(),
        });
      });
    }

    return allOrders;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}