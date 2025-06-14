import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
} from "firebase/firestore";

export type UserRequest = {
  "Customer-Name": string;
  "Phone-Number": string;
  "Product-Name": string;
  "Product-Price": string;
  "Customer-Address": string;
};

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
        "Customer-Address": data["Customer-Address"] || "",
      };
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
