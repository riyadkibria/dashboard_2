// lib/fetchOrders.ts
import { collectionGroup, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export type Order = {
  address: string;
  createdAt: Timestamp;
  mobile: string;
  name: string;
  productName: string;
  productPrice: string;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const snapshot = await getDocs(collectionGroup(db, "orders"));
  const orders: Order[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as Order;
    orders.push(data);
  });

  return orders;
};

