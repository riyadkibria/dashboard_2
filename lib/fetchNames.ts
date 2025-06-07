import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export type OrderData = {
  nameId: string;
  orderId: string;
  Time?: Timestamp;
  [key: string]: unknown;
};

export async function fetchNames(): Promise<OrderData[]> {
  const namesCollection = collection(db, "Names");
  const namesSnapshot = await getDocs(namesCollection);

  const allOrders: OrderData[] = [];

  for (const nameDoc of namesSnapshot.docs) {
    const ordersRef = collection(db, "Names", nameDoc.id, "orders");
    const ordersSnapshot = await getDocs(ordersRef);

    ordersSnapshot.forEach((orderDoc) => {
      const orderData = orderDoc.data();
      allOrders.push({
        nameId: nameDoc.id,
        orderId: orderDoc.id,
        Time: orderData.Time,
        ...orderData,
      });
    });
  }

  // Filter out orders without a Time, then sort descending by Time (newest first)
  const sortedOrders = allOrders
    .filter((order) => order.Time instanceof Timestamp)
    .sort(
      (a, b) =>
        (b.Time as Timestamp).toMillis() - (a.Time as Timestamp).toMillis()
    );

  // Return only the latest 2 orders
  return sortedOrders.slice(0, 2);
}
