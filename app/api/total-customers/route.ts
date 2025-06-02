import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const totalCustomers = usersSnapshot.size;

    return NextResponse.json({ totalCustomers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ totalCustomers: 0 });
  }
}
