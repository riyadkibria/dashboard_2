import { db } from './firebase';
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
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
  const latestOrdersQuery = query(ordersRef, orderBy('createdAt', 'desc'), limit(5));
  const snapshot = await getDocs(latestOrdersQuery);

  const orders: Order[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as DocumentData;

    orders.push({
      id: doc.id,
      name: data.name || '',
      mobile: data.mobile || '',
      address: data.address || '',
      productName: data.productName || '',
      productPrice: data.productPrice || '',
      createdAt: data.createdAt,
    });
  });

  return orders;
}
