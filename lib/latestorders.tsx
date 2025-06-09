import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  Timestamp,
} from "firebase/firestore";

// Updated type with only required fields
export type UserRequest = {
  "Customer-Name": string;
  "Phone-Number": string;
  "Product-Name": string;
  "Product-Price": string;
   Time?: Timestamp; // 👈 Add this line
};

// Updated function to fetch and return only selected fields
export async function getLatestOrders(limitCount: number = 5): Promise<UserRequest[]> {
  try {
    const ordersRef = collection(db, "user_request");
    const q = query(ordersRef, orderBy("Time", "desc"), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        "Customer-Name": data["Customer-Name"] || "",
        "Phone-Number": data["Phone-Number"] || "",
        "Product-Name": data["Product-Name"] || "",
        "Product-Price": data["Product-Price"] || "",
      };
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
