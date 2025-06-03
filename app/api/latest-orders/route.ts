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
    const ordersGroupRef = collectionGroup(db, 'orders');

    // Query sorted by Firestore Timestamp descending
    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    const querySnapshot = await getDocs(q);

    console.log('Found orders:', querySnapshot.size);

    const latestOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const userId = doc.ref.parent.parent?.id || null;

      const createdAtTimestamp = data.createdAt;

      // Format human-readable date string
      const createdAtFormatted = createdAtTimestamp
        ? createdAtTimestamp.toDate().toLocaleString('en-US', {
            timeZone: 'Asia/Dhaka',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
        : null;

      // Also return ISO string for sorting on client if needed
      const createdAtISO = createdAtTimestamp
        ? createdAtTimestamp.toDate().toISOString()
        : null;

      return {
        id: doc.id,
        ...data,
        createdAtFormatted,
        createdAtISO,
        userId,
      };
    });

    if (latestOrders.length === 0) {
      console.warn('⚠️ No recent orders found. Ensure createdAt is saved as Firestore Timestamp.');
    }

    return NextResponse.json({ latestOrders });
  } catch (error) {
    console.error('🔥 Error fetching orders:', error instanceof Error ? error.message : error);
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}

