// pages/api/getOrders.ts (or wherever you keep API functions)
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Order {
  id: string;
  name: string;
  productName: string;
  productPrice: number;
  address: string;
  mobile: string;
  createdAt: string; // or Timestamp, adjust accordingly
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  if (!userId) return [];

  const ordersRef = collection(db, 'users', userId, 'orders');
  const querySnapshot = await getDocs(ordersRef);

  const orders: Order[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Order, 'id'>),
  }));

  return orders;
}
