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
    // 1. Query across all 'orders' subcollections
    const ordersGroupRef = collectionGroup(db, 'orders');

    // 2. Query: order by 'createdAt' descending, limit 5
    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    // 3. Fetch documents
    const querySnapshot = await getDocs(q);

    // 4. Log how many documents were fetched
    console.log('Found orders:', querySnapshot.size);

    // 5. Extract and return data
    const latestOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const userId = doc.ref.parent.parent?.id || null;

      console.log(`Order ID: ${doc.id}, User ID: ${userId}, createdAt: ${data.createdAt}`);

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        userId,
      };
    });

    // 6. Handle case when no documents were found
    if (latestOrders.length === 0) {
      console.warn('No recent orders found. Make sure createdAt exists and is a Firestore Timestamp.');
    }

    return NextResponse.json({ latestOrders });
  } catch (error: any) {
    console.error('🔥 Error fetching latest orders:', error.message || error);
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}
