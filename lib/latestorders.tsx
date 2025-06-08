import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  Timestamp,
} from "firebase/firestore";

export type UserRequest = {
  Address: string;
  Courier: string;
  "Customer-Name": string;
  Description: string;
  "Phone-Number": string;
  "Product-Links": string[];
  "Product-Name": string;
  "Product-Price": string;
  Quantity: string;
  Time: Timestamp;
  "User-Email": string;
};

export async function getLatestOrders(limitCount: number = 5): Promise<UserRequest[]> {
  try {
    const ordersRef = collection(db, "user_request");
    const q = query(ordersRef, orderBy("Time", "desc"), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as UserRequest);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

