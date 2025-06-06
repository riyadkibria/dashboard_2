import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// 🧾 Define exactly what a single order looks like
export interface OrderData {
  id: string;
  name: string;
  mobile: string;
  address: string;
  productName: string;
  productPrice: string;
  createdAt: Timestamp;
}

/**
 * Fetches all orders for a given user UID from Firestore.
 * @param uid The user ID.
 * @returns An array of orders with details.
 */
export const getOrdersForUser = async (uid: string): Promise<OrderData[]> => {
  try {
    // 🔎 Go to: users → [uid] → orders
    const ordersRef = collection(db, 'users', uid, 'orders');
    const snapshot = await getDocs(ordersRef);

    const orders: OrderData[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      // ✅ Make sure all expected fields exist
      if (
        typeof data.name === 'string' &&
        typeof data.mobile === 'string' &&
        typeof data.address === 'string' &&
        typeof data.productName === 'string' &&
        typeof data.productPrice === 'string' &&
        data.createdAt instanceof Timestamp
      ) {
        orders.push({
          id: docSnap.id,
          name: data.name,
          mobile: data.mobile,
          address: data.address,
          productName: data.productName,
          productPrice: data.productPrice,
          createdAt: data.createdAt,
        });
      } else {
        console.warn(`Skipping order ${docSnap.id} — missing or invalid fields.`);
      }
    });

    return orders;
  } catch (error) {
    console.error(`[Firestore] Failed to fetch orders for user ${uid}:`, error);
    return [];
  }
};
