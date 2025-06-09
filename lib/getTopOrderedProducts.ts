"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getTopOrderedProducts } from "@/lib/getTopOrderedProducts";

type TopProduct = {
  name: string;
  orderCount: number;
  totalRevenue: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getTopOrderedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching top products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`transition-all duration-300 ease-in-out p-6 ${
          isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
        }`}
      >
        <div className="w-full min-h-[85vh] bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Top Ordered Products
          </h1>

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-gray-500">No product data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Total Orders</th>
                    <th className="px-4 py-2">Total Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.orderCount}</td>
                      <td className="px-4 py-2">${product.totalRevenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
