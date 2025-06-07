import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

interface OrderData {
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
      const data = orderDoc.data() as OrderData; // ✅ explicitly typed

      return {
        orderId: orderDoc.id,
        userId,
        address: data.address,
        createdAt: data.createdAt,
        mobile: data.mobile,
        name: data.name,
        productName: data.productName,
        productPrice: data.productPrice,
      };
    });

    allOrders.push(...userOrders);
  }

  return allOrders;
};
