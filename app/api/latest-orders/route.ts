import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Reference the orders collection
    const ordersRef = collection(db, 'orders');
    
    // Create query: order by 'createdAt' descending, limit 5
    const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(5));

    const querySnapshot = await getDocs(q);

    // Map the orders to an array of objects
    const latestOrders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString() || null, // convert Firestore timestamp to ISO string
    }));

    return NextResponse.json({ latestOrders });
  } catch (error) {
    console.error('Error fetching latest orders:', error);
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}
