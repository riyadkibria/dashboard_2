import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

// Strongly typed Order
export type Order = {
  userId: string;
  orderId: string;
  address: string;
  createdAt: Timestamp;
  mobile: string;
  name: string;
  productName: string;
  productPrice: string;
};

export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const allOrders: Order[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const ordersSnapshot = await getDocs(collection(db, `users/${userId}/orders`));

      ordersSnapshot.forEach(orderDoc => {
        const data = orderDoc.data();

        // Optional: Add validation checks if needed
        if (
          data.address &&
          data.createdAt &&
          data.mobile &&
          data.name &&
          data.productName &&
          data.productPrice
        ) {
          allOrders.push({
            userId,
            orderId: orderDoc.id,
            address: data.address,
            createdAt: data.createdAt,
            mobile: data.mobile,
            name: data.name,
            productName: data.productName,
            productPrice: data.productPrice,
          });
        }
      });
    }

    return allOrders;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}
