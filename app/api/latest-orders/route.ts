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
    // Get all documents from all 'orders' subcollections
    const ordersGroupRef = collectionGroup(db, 'orders');

    // Query the documents ordered by 'createdAt' in descending order
    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    const querySnapshot = await getDocs(q);

    console.log('✅ Found orders:', querySnapshot.size);

    const latestOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const userId = doc.ref.parent.parent?.id || 'unknown';

      const createdAt = data.createdAt;

      const createdAtFormatted = createdAt?.toDate?.()
        ? createdAt.toDate().toLocaleString('en-US', {
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

      const createdAtISO = createdAt?.toDate?.()
        ? createdAt.toDate().toISOString()
        : null;

      const name = data.name || 'N/A'; // 👈 Extracting 'name' field

      return {
        id: doc.id,
        userId,
        name,
        createdAtFormatted,
        createdAtISO,
        totalPrice: data.totalPrice || 0,
      };
    });

    if (latestOrders.length === 0) {
      console.warn(
        '⚠️ No recent orders found. Make sure each document has a Firestore Timestamp field called createdAt.'
      );
    }

    return NextResponse.json({ latestOrders });
  } catch (error) {
    console.error(
      '🔥 Error fetching orders:',
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}
