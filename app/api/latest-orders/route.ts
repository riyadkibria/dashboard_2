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

    const q = query(ordersGroupRef, orderBy('createdAt', 'desc'), limit(5));

    const querySnapshot = await getDocs(q);

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

      return {
        id: doc.id,
        userId,
        createdAtFormatted,
        createdAtISO,
        name: data.name || null,
        mobile: data.mobile || null,
        address: data.address || null,
        productName: data.productName || null,
        productPrice: data.productPrice || null,
      };
    });

    return NextResponse.json({ latestOrders });
  } catch (error) {
    console.error('Error fetching latest orders:', error);
    return NextResponse.json({ latestOrders: [] }, { status: 500 });
  }
}
