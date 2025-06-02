import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Access /users collection
    const usersSnapshot = await getDocs(collection(db, 'users'));

    // Log to verify in server
    console.log("Fetched user docs:", usersSnapshot.size);

    // Get user IDs
    const userIds = usersSnapshot.docs.map(doc => doc.id);
    console.log("User IDs found:", userIds);

    const totalCustomers = userIds.length;

    return NextResponse.json({ totalCustomers });
  } catch (error) {
    console.error('Error fetching total customers:', error);
    return NextResponse.json({ totalCustomers: 0 }, { status: 500 });
  }
}

