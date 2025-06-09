"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getTopOrderedProducts } from "@/lib/getTopOrderedProducts";

export default function ProductsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [products, setProducts] = useState<
    { name: string; totalOrders: number }[]
  >([]);

  useState(() => {
    // Fetch products once on mount
    getTopOrderedProducts().then(setProducts);
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {!isCollapsed && (
        <div className="w-64 border-r">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <button
          className="mb-4 px-3 py-1 bg-gray-200 rounded"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Show Sidebar" : "Hide Sidebar"}
        </button>

        <h1 className="text-2xl font-bold mb-4">Top Ordered Products</h1>

        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.name} className="p-4 border rounded shadow-sm">
                <div className="text-lg font-medium">{product.name}</div>
                <div className="text-gray-600">
                  Total Quantity Ordered: {product.totalOrders}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
