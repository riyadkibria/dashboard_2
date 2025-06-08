import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export type OrderData = {
  userId: string;
  orderId: string;
  createdAt?: Timestamp;
  name?: string;
  productName?: string;
  productPrice?: string;
  address?: string;
  mobile?: string;
};

export async function fetchLatestOrders(): Promise<OrderData[]> {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);

  const allOrders: OrderData[] = [];

  for (const userDoc of usersSnapshot.docs) {
    const ordersRef = collection(db, "users", userDoc.id, "orders");
    const ordersSnapshot = await getDocs(ordersRef);

    ordersSnapshot.forEach((orderDoc) => {
      const data = orderDoc.data();
      allOrders.push({
        userId: userDoc.id,
        orderId: orderDoc.id,
        createdAt: data.createdAt,
        name: data.name,
        productName: data.productName,
        productPrice: data.productPrice,
        address: data.address,
        mobile: data.mobile,
      });
    });
  }

  // Sort by createdAt (descending), filter only valid timestamps
  return allOrders
    .filter((order) => order.createdAt instanceof Timestamp)
    .sort((a, b) => b.createdAt!.toMillis() - a.createdAt!.toMillis())
    .slice(0, 5); // latest 5
}

