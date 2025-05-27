import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Order {
  id: string;
  name: string;
  productName: string;
  productPrice: string;
  address: string;
  mobile: string;
  createdAt: number; // stored as milliseconds since epoch
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    // Corrected template string with backticks for dynamic path
    const ordersRef = collection(db, `users/${userId}/orders`);
    const snapshot = await getDocs(ordersRef);

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: typeof data.name === 'string' ? data.name : '',
        productName: typeof data.productName === 'string' ? data.productName : '',
        productPrice: typeof data.productPrice === 'string' ? data.productPrice : '',
        address: typeof data.address === 'string' ? data.address : '',
        mobile: typeof data.mobile === 'string' ? data.mobile : '',
        createdAt: data.createdAt?.toMillis?.() ?? Date.now(), // fallback if no timestamp
      };
    });
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    return [];
  }
}
