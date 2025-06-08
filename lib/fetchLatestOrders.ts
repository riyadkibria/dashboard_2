import { db } from './firebase';
import {
  collection,
  getDocs,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';

export interface Order {
  id: string;
  name: string;
  mobile: string;
  address: string;
  productName: string;
  productPrice: string;
  createdAt?: Timestamp;
}

export async function fetchLatestOrders(): Promise<Order[]> {
  const ordersRef = collection(db, 'orders');
  const snapshot = await getDocs(ordersRef);

  const allOrders: Order[] = snapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;

    return {
      id: doc.id,
      name: data.name || '',
      mobile: data.mobile || '',
      address: data.address || '',
      productName: data.productName || '',
      productPrice: data.productPrice || '',
      createdAt: data.createdAt,
    };
  });

  // ✅ Filter out orders without a valid Timestamp, then sort
  const sortedOrders = allOrders
    .filter((order) => order.createdAt instanceof Timestamp)
    .sort(
      (a, b) =>
        (b.createdAt as Timestamp).toMillis() - (a.createdAt as Timestamp).toMillis()
    );

  // ✅ Return only the latest 2 orders
  return sortedOrders.slice(0, 2);
}
