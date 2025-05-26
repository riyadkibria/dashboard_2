// file: /pages/api/getOrders.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Order = {
  id: string;
  name: string;
  productName: string;
  productPrice: number;
  address: string;
  mobile: string;
  createdAt: string;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'users', userId, 'orders');
    const snapshot = await getDocs(ordersRef);

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};
