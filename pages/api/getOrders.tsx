// pages/api/getOrders.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Order {
  id: string;
  name: string;
  productName: string;
  productPrice: string;
  address: string;
  mobile: string;
  createdAt: number;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const ordersRef = collection(db, `users/${userId}/orders`);
  const snapshot = await getDocs(ordersRef);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || '',
      productName: data.productName || '',
      productPrice: data.productPrice || '',
      address: data.address || '',
      mobile: data.mobile || '',
      createdAt: data.createdAt?.toMillis?.() || Date.now(),
    };
  });
}
