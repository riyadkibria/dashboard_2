import { db } from '@/lib/firebase';
import { collectionGroup, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Collection group query on all 'orders' subcollections
    const ordersGroupRef = collectionGroup(db, 'orders');

    // Query: order by createdAt descending, limit 5
    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    const querySnapshot = await getDocs(q);

    const latestOrders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString() || null,
      userId: doc.ref.parent.parent?.id || null, // extract userId from the path
    }));

    return NextResponse.json({ latestOrders });
  } catch (error) {
    console.error('Error fetching latest orders:', error);
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}

