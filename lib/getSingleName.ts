import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Make sure this exports your initialized Firestore

// Define the shape of the document
export interface CustomerData {
  id: string;
  customerName: string;
}

/**
 * Fetches all documents from the 'user_request' collection in Firestore.
 * @returns Array of documents containing their ID and Customer-Name field.
 */
export const getAllCustomerNames = async (): Promise<CustomerData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'user_request'));

    const customers: CustomerData[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();

      if (typeof data['Customer-Name'] === 'string') {
        customers.push({
          id: docSnap.id,
          customerName: data['Customer-Name'],
        });
      } else {
        console.warn(`[Firestore] Skipping document ${docSnap.id}: Missing or invalid "Customer-Name"`);
      }
    });

    return customers;
  } catch (error) {
    console.error('[Firestore] Error fetching customer names:', error);
    return [];
  }
};
