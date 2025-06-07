// lib/getAllCustomerNames.ts

import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// Define the type
export interface CustomerData {
  id: string;
  name: string;
}

/**
 * Fetches all customer names from Firestore.
 */
export const getAllCustomerNames = async (): Promise<CustomerData[]> => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    const customers: CustomerData[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (typeof data.name === 'string') {
        customers.push({
          id: doc.id,
          name: data.name,
        });
      }
    });

    return customers;
  } catch (error) {
    console.error('[Firestore] Failed to fetch customer names:', error);
    return [];
  }
};

