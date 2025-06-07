// lib/fetchOrders.ts
import { db } from "./firebase";
import {
  collectionGroup,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export type Order = {
  id: string;
  userId: string;
  address: string;
  createdAt: Timestamp;
  mobile: string;
  name: string;
  productName: string;
  productPrice: number;
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  const q = query(collectionGroup(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const orders: Order[] = snapshot.docs.map((doc) => {
    const userId = doc.ref.path.split("/")[1];
    const d = doc.data();

    return {
      id: doc.id,
      userId,
      address: d.address ?? "",
      createdAt: d.createdAt,
      mobile: d.mobile ?? "",
      name: d.name ?? "",
      productName: d.productName ?? "",
      productPrice: d.productPrice ?? 0,
    };
  });

  return orders;
};

