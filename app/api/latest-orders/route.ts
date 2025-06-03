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
    // Reference to all 'orders' subcollections under any user
    const ordersGroupRef = collectionGroup(db, 'orders');

    // Create a query: order by 'createdAt' descending and limit to 5
    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Format the results
    const latestOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        userId: doc.ref.parent.parent?.id || null, // Get userId from the path
      };
    });

    return NextResponse.json({ latestOrders });
  } catch (error) {
    console.error('Error fetching latest orders:', error);
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}


