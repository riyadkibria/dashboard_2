// pages/api/getOrders.js or inside a React component
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const getUserOrders = async (userId) => {
  try {
    const ordersRef = collection(db, 'users', userId, 'orders');
    const snapshot = await getDocs(ordersRef);

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
