// lib/fetchNames.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

type OrderData = {
  nameId: string;
  orderId: string;
  [key: string]: unknown; // allows extra fields in order data
};

export async function fetchNames(): Promise<OrderData[]> {
  const namesCollection = collection(db, "Names");
  const namesSnapshot = await getDocs(namesCollection);

  const allOrders: OrderData[] = [];

  for (const nameDoc of namesSnapshot.docs) {
    const ordersRef = collection(db, "Names", nameDoc.id, "orders");
    const ordersSnapshot = await getDocs(ordersRef);

    ordersSnapshot.forEach((orderDoc) => {
      allOrders.push({
        nameId: nameDoc.id,
        orderId: orderDoc.id,
        ...orderDoc.data(),
      });
    });
  }

  return allOrders;
}
