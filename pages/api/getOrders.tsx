
import { collectionGroup, getDocs } from 'firebase/firestore';
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

export async function getAllOrders(): Promise<Order[]> {
  try {
    const ordersRef = collectionGroup(db, 'orders');
    const snapshot = await getDocs(ordersRef);

    if (snapshot.empty) {
      console.warn('⚠️ No orders found.');
      return [];
    }

    const orders: Order[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: typeof data.name === 'string' ? data.name : '',
        productName: typeof data.productName === 'string' ? data.productName : '',
        productPrice: typeof data.productPrice === 'string' ? data.productPrice : '',
        address: typeof data.address === 'string' ? data.address : '',
        mobile: typeof data.mobile === 'string' ? data.mobile : '',
        createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
      };
    });

    return orders;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Error fetching all orders:', error.message);
    } else {
      console.error('❌ Unknown error:', error);
    }
    return [];
  }
}
