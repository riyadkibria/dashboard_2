import { db } from '@/lib/firebase';
import {
  collectionGroup,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Reference all 'orders' subcollections across users
    const ordersGroupRef = collectionGroup(db, 'orders');

    // 2. Query: order by Firestore Timestamp
    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    // 3. Fetch results
    const querySnapshot = await getDocs(q);

    console.log('Found orders:', querySnapshot.size);

    // 4. Extract and format data
    const latestOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const userId = doc.ref.parent.parent?.id || null;

      const formattedDate = data.createdAt?.toDate().toLocaleString('en-US', {
        timeZone: 'Asia/Dhaka', // Or your preferred timezone
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      console.log(`Order ID: ${doc.id}, User ID: ${userId}, createdAt: ${formattedDate}`);

      return {
        id: doc.id,
        ...data,
        createdAt: formattedDate || null,
        userId,
      };
    });

    if (latestOrders.length === 0) {
      console.warn('⚠️ No recent orders found. Ensure createdAt is a Firestore Timestamp.');
    }

    return NextResponse.json({ latestOrders });
  } catch (error: unknown) {
    console.error('🔥 Error fetching orders:', error instanceof Error ? error.message : error);
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}
