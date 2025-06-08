import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export type OrderData = {
  nameId: string;       // here it will be userId now
  orderId: string;
  address?: string;
  createdAt?: Timestamp;
  mobile?: string;
  name?: string;
  productName?: string;
  productPrice?: string;
  Time?: Timestamp;
  [key: string]: unknown;
};

export async function fetchNames(): Promise<OrderData[]> {
  const usersCollection = collection(db, "users");  // Changed here
  const usersSnapshot = await getDocs(usersCollection);

  const allOrders: OrderData[] = [];

  for (const userDoc of usersSnapshot.docs) {
    const ordersRef = collection(db, "users", userDoc.id, "orders");  // Changed here
    const ordersSnapshot = await getDocs(ordersRef);

    ordersSnapshot.forEach((orderDoc) => {
      const orderData = orderDoc.data();

      allOrders.push({
        nameId: userDoc.id,  // this is now the userId
        orderId: orderDoc.id,
        address: orderData.address || "335/3 zafrabad,shankar",
        createdAt: orderData.createdAt,
        mobile: orderData.mobile || "01918646488",
        name: orderData.name || "Riyad Bin Kibria",
        productName: orderData.productName || "",
        productPrice: orderData.productPrice || "",
        Time: orderData.Time,
      });
    });
  }

  // Filter orders with valid createdAt Timestamp and sort descending
  const sortedOrders = allOrders
    .filter((order) => order.createdAt instanceof Timestamp)
    .sort(
      (a, b) =>
        (b.createdAt as Timestamp).toMillis() - (a.createdAt as Timestamp).toMillis()
    );

  // Return the latest 2 orders only
  return sortedOrders.slice(0, 2);
}