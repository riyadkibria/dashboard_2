'use client';

import { useState, useEffect } from 'react';

export default function AddPage() {
  // You can fetch or calculate totalPrice dynamically
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Example: Load total price from localStorage or API
    const storedTotal = localStorage.getItem('totalPrice');
    if (storedTotal) {
      setTotalPrice(parseFloat(storedTotal));
    } else {
      // fallback or default value
      setTotalPrice(349.99);
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-xs w-full text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Price</h2>
        <p className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

