import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getTotalOrders(): Promise<number> {
  const snapshot = await getDocs(collection(db, "user_request")); // use your actual collection name
  return snapshot.size;
}
