import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function fetchNames() {
  const namesCollection = collection(db, "Names");

  try {
    const namesSnapshot = await getDocs(namesCollection);

    const allOrders: any[] = [];

    for (const nameDoc of namesSnapshot.docs) {
      const ordersRef = collection(db, "Names", nameDoc.id, "orders");
      const ordersSnapshot = await getDocs(ordersRef);

      ordersSnapshot.forEach(orderDoc => {
        allOrders.push({
          nameId: nameDoc.id,
          orderId: orderDoc.id,
          ...orderDoc.data(),
        });
      });
    }

    return allOrders;
  } catch (error) {
    console.error("Error fetching orders from subcollections:", error);
    return [];
  }
}
