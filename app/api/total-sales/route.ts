import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // ✅ your config path

export async function GET() {
  try {
    const ordersRef = collection(db, 'orders');
    const snapshot = await getDocs(ordersRef);

    let total = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const priceString = data.productPrice;

      if (typeof priceString === 'string') {
        // Match the value after "=" (e.g., "৳15000")
        const match = priceString.match(/=\s*৳?(\d+(?:\.\d+)?)/);
        if (match && match[1]) {
          const price = parseFloat(match[1]);
          total += price;
        }
      }
    });

    return NextResponse.json({ totalSales: total });
  } catch (error) {
    console.error('Failed to calculate total sales:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
