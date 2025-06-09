import Sidebar from "@/components/Sidebar";
import { getTopOrderedProducts } from "@/lib/getTopOrderedProducts";

export default async function ProductsPage() {
  const products = await getTopOrderedProducts();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
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
