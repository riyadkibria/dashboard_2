// lib/fetchNames.ts
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

// Define the type to include Time (can be Timestamp or undefined)
export type OrderData = {
  nameId: string;
  orderId: string;
  Time?: Timestamp;
  [key: string]: unknown; // include any extra fields
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
        Time: orderData.Time, // includes timestamp if present
        ...orderData,         // spread the rest of the data
      });
    });
  }

  return allOrders;
}
