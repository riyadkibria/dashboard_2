import { db } from './firebase';
import { collection, getDocs, orderBy, limit, query, Timestamp } from 'firebase/firestore';

export interface Order {
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

  return snapshot.docs.map(doc => doc.data() as Order);
}
