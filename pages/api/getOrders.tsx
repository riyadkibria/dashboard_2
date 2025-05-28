import { collection, collectionGroup, getDocs, query, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Order {
  id: string;
  name: string;
  productName: string;
  productPrice: string;
  address: string;
  mobile: string;
  createdAt: number;  // timestamp in ms
}

interface FirestoreOrderData {
  name?: string;
  productName?: string;
  productPrice?: string;
  address?: string;
  mobile?: string;
  createdAt?: { toMillis: () => number }; // Firestore Timestamp shape
}

// Get all orders across all users (used in dashboard)
export async function getAllOrders(): Promise<Order[]> {
  try {
    // Optional: Order by createdAt descending to get recent first
    const ordersRef = collectionGroup(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn('⚠️ No orders found.');
      return [];
    }

    const orders: Order[] = snapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreOrderData;

      return {
        id: doc.id,
        name: data.name ?? '',
        productName: data.productName ?? '',
        productPrice: data.productPrice ?? '',
        address: data.address ?? '',
        mobile: data.mobile ?? '',
        createdAt: data.createdAt?.toMillis() ?? Date.now(),
      };
    });

    return orders;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Error fetching all orders:', error.message);
    } else {
      console.error('❌ Unknown error fetching all orders:', error);
    }
    return [];
  }
}

// Get orders for a specific user (used when userId is available)
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    if (!userId) {
      console.warn('⚠️ userId is missing or undefined.');
      return [];
    }

    const ordersPath = `users/${userId}/orders`;
    const ordersRef = collection(db, ordersPath);
    const q = query(ordersRef, orderBy('createdAt', 'desc')); // Optional ordering
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn(`⚠️ No orders found for user: ${userId}`);
      return [];
    }

    const orders: Order[] = snapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreOrderData;

      return {
        id: doc.id,
        name: data.name ?? '',
        productName: data.productName ?? '',
        productPrice: data.productPrice ?? '',
        address: data.address ?? '',
        mobile: data.mobile ?? '',
        createdAt: data.createdAt?.toMillis() ?? Date.now(),
      };
    });

    return orders;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error fetching orders for user ${userId}:`, error.message);
    } else {
      console.error('❌ Unknown error fetching user orders:', error);
    }
    return [];
  }
}
