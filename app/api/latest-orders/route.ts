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
    // 1. Reference all 'orders' subcollections across all users
    const ordersGroupRef = collectionGroup(db, 'orders');

    // 2. Create a query ordering by 'createdAt' Timestamp descending, limit 5
    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    // 3. Execute the query
    const querySnapshot = await getDocs(q);

    console.log('Found orders:', querySnapshot.size);

    // 4. Extract data and format 'createdAt' as a readable string (without altering stored data)
    const latestOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const userId = doc.ref.parent.parent?.id || null;

      // Format timestamp to human-readable string, fallback null if missing
      const formattedDate = data.createdAt
        ? data.createdAt.toDate().toLocaleString('en-US', {
            timeZone: 'Asia/Dhaka', // Adjust to your timezone
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
        : null;

      console.log(`Order ID: ${doc.id}, User ID: ${userId}, createdAt: ${formattedDate}`);

      return {
        id: doc.id,
        ...data,
        createdAt: formattedDate,
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
