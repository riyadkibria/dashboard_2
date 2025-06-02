import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);

    // Get all UIDs (document IDs)
    const uids = usersSnapshot.docs.map(doc => doc.id);

    const totalCustomers = uids.length;

    return NextResponse.json({ totalCustomers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ totalCustomers: 0 });
  }
}
