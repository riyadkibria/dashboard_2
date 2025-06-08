import { db } from './firebase';
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
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

  // ✅ Let Firestore sort by createdAt and limit results
  const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(2));
  const snapshot = await getDocs(q);

  const latestOrders: Order[] = snapshot.docs.map((doc) => {
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

  return latestOrders;
}
