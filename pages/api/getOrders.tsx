// pages/api/getNames.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface NameDoc {
  id: string;
  // Add fields here based on your data schema, e.g.:
  name?: string;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameDoc[] | { error: string }>
) {
  try {
    const namesRef = collection(db, 'Names');
    const snapshot = await getDocs(namesRef);

    const allNames: NameDoc[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(allNames);
  } catch (error) {
    console.error('❌ Error fetching names:', error);
    res.status(500).json({ error: 'Failed to fetch names' });
  }
}
