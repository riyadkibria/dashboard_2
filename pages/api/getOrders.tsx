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
  try {
    const ordersRef = collection(db, `users/${userId}/orders`);
    const ordersSnapshot = await getDocs(ordersRef);

    const allOrders: Order[] = [];

    for (const orderDoc of ordersSnapshot.docs) {
      const subOrdersRef = collection(
        db,
        `users/${userId}/orders/${orderDoc.id}/orderDocs` // replace 'orderDocs' with actual subcollection name if different
      );
      const subOrdersSnapshot = await getDocs(subOrdersRef);

      subOrdersSnapshot.forEach((doc) => {
        const data = doc.data();
        allOrders.push({
          id: doc.id,
          name: typeof data.name === 'string' ? data.name : '',
          productName: typeof data.productName === 'string' ? data.productName : '',
          productPrice: typeof data.productPrice === 'string' ? data.productPrice : '',
          address: typeof data.address === 'string' ? data.address : '',
          mobile: typeof data.mobile === 'string' ? data.mobile : '',
          createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
        });
      });
    }

    return allOrders;
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    return [];
  }
}
