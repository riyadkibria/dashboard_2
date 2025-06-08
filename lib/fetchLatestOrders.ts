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

export async function fetchLatestOrders(count: number = 5): Promise<Order[]> {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(count));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
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
}
