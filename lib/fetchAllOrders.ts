// lib/fetchAllOrders.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchAllOrders = async () => {
  const usersRef = collection(db, "users");
  const usersSnapshot = await getDocs(usersRef);

  const allOrders: any[] = [];

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    const ordersRef = collection(db, "users", userId, "orders");
    const ordersSnapshot = await getDocs(ordersRef);

    const userOrders = ordersSnapshot.docs.map((orderDoc) => ({
      orderId: orderDoc.id,
      userId,
      ...orderDoc.data(),
    }));

    allOrders.push(...userOrders);
  }

  return allOrders;
};
