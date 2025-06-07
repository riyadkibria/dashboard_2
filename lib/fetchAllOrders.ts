
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface Order {
  orderId: string;
  userId: string;
  address: string;
  createdAt: Timestamp;
  mobile: string;
  name: string;
  productName: string;
  productPrice: string;
}

export const fetchAllOrders = async (): Promise<Order[]> => {
  const usersRef = collection(db, "users");
  const usersSnapshot = await getDocs(usersRef);
  const allOrders: Order[] = [];

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    const ordersRef = collection(db, "users", userId, "orders");
    const ordersSnapshot = await getDocs(ordersRef);

    const userOrders: Order[] = ordersSnapshot.docs.map((orderDoc) => {
      const data = orderDoc.data() as Omit<Order, "orderId" | "userId">;

      return {
        orderId: orderDoc.id,
        userId,
        ...data,
      };
    });

    allOrders.push(...userOrders);
  }

  return allOrders;
};
