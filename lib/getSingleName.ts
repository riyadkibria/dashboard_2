
// lib/getSingleName.ts

import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // make sure this exports your initialized Firestore instance

// Define the shape of the document
export interface NameData {
  id: string;
  Name: string;
}

/**
 * Fetches a specific document from the 'Names' collection in Firestore.
 * @param docId The document ID to fetch (e.g., 'miB2BpABeOC1arOqM2hp')
 * @returns The document data with its ID, or null if not found or malformed.
 */
export const getSingleName = async (docId: string): Promise<NameData | null> => {
  try {
    const docRef = doc(db, 'Names', docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn(`[Firestore] Document not found in 'Names' with ID: ${docId}`);
      return null;
    }

    const data = docSnap.data();
    console.log('[Firestore] Data fetched:', data);

    if (typeof data?.Name === 'string') {
      return {
        id: docSnap.id,
        Name: data.Name,
      };
    } else {
      console.error('[Firestore] Missing or invalid "Name" field:', data);
      return null;
    }
  } catch (error) {
    console.error('[Firestore] Error getting document:', error);
    return null;
  }
};
