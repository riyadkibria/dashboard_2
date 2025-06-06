// lib/getSingleName.ts

import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface NameData {
  id: string;
  Name: string;
  age: number;
  email: string;
}

/**
 * Fetches a specific document from the 'Names' collection in Firestore.
 * @returns The document data with its ID, or null if not found or malformed.
 */
export const getSingleName = async (): Promise<NameData | null> => {
  try {
    const docRef = doc(db, 'Names', 'miB2BpABeOC1arOqM2hp');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn('[Firestore] Document not found in collection: Names');
      return null;
    }

    const data = docSnap.data();
    console.log('[Firestore] Fetched data:', data); // 🔍 Debug log

    if (
      data &&
      typeof data.Name === 'string' &&
      typeof data.age === 'number' &&
      typeof data.email === 'string'
    ) {
      return {
        id: docSnap.id,
        Name: data.Name,
        age: data.age,
        email: data.email,
      };
    } else {
      console.error('[Firestore] Document structure is invalid or missing fields.', data);
      return null;
    }
  } catch (error) {
    console.error('[Firestore] Error fetching document:', error);
    return null;
  }
};
