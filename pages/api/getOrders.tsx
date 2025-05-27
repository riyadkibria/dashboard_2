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
  try {
    if (!userId) {
      console.warn('⚠️ userId is missing or undefined.');
      return [];
    }

    const ordersPath = `users/${userId}/orders`;
    console.log(`📁 Fetching orders from path: ${ordersPath}`);

    const ordersRef = collection(db, ordersPath);
    const snapshot = await getDocs(ordersRef);

    if (snapshot.empty) {
      console.warn(`⚠️ No orders found for user: ${userId}`);
      return [];
    }

    const orders: Order[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      if (!data) {
        console.warn(`⚠️ No data found in document: ${doc.id}`);
        return null;
      }

      console.log(`📄 Order fetched: ${doc.id}`, data);

      return {
        id: doc.id,
        name: typeof data.name === 'string' ? data.name : '',
        productName: typeof data.productName === 'string' ? data.productName : '',
        productPrice: typeof data.productPrice === 'string' ? data.productPrice : '',
        address: typeof data.address === 'string' ? data.address : '',
        mobile: typeof data.mobile === 'string' ? data.mobile : '',
        createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
      };
    }).filter((o): o is Order => o !== null); // filter out nulls

    return orders;
  } catch (error: any) {
    console.error('❌ Error fetching user orders:', error.message || error);
    return [];
  }
}
