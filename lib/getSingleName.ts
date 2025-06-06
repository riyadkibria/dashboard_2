// lib/getSingleName.ts

import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface NameData {
  id: string;
  name: string;
  age: number;
  email: string;
}

/**
 * Fetches a specific document from the 'Names' collection in Firestore.
 * @returns The document data with its ID, or null if not found.
 */
export const getSingleName = async (): Promise<NameData | null> => {
  try {
    const docRef = doc(db, 'Names', 'miB2BpABeOC1arOqM2hp');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn('Document not found in collection: Names');
      return null;
    }

    const data = docSnap.data();

    // Type assertion with validation fallback
    if (
      typeof data.name === 'string' &&
      typeof data.age === 'number' &&
      typeof data.email === 'string'
    ) {
      return {
        id: docSnap.id,
        name: data.name,
        age: data.age,
        email: data.email,
      };
    } else {
      console.error('Document data is malformed.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document from Firestore:', error);
    return null;
  }
};

