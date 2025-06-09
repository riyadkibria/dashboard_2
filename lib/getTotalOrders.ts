import { db } from "./firebase";

export async function getTotalOrders(): Promise<number> {
  const snapshot = await db.collection("orders").get();
  return snapshot.size;
}
