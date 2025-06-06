// lib/getSingleName.ts

import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface NameData {
  id: string;
  [key: string]: any; // Replace 'any' with specific fields if known, e.g., name: string;
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

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as NameData;

  } catch (error) {
    console.error('Error fetching document from Firestore:', error);
    return null;
  }
};
