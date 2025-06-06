// lib/getSingleName.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getSingleName = async () => {
  const docRef = doc(db, 'Names', 'miB2BpABeOC1arOqM2hp');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};
