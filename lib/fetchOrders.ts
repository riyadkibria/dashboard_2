import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchAllOrders() {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const allOrders = [];

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

