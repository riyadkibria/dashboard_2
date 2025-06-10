"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getTopOrderedProducts } from "@/lib/getTopOrderedProducts";

export default function ProductsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [products, setProducts] = useState<
    { name: string; totalOrders: number }[]
  >([]);

  useEffect(() => {
    getTopOrderedProducts().then(setProducts);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      {!isCollapsed && (
        <div className="w-64 border-r bg-white shadow-md">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Top Ordered Products</h1>

        {products.length === 0 ? (
          <p className="text-sm text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="w-full md:w-[90%] bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg"
              >
                <h2 className="text-base font-medium text-gray-900 mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Total Quantity Ordered: {product.totalOrders}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
