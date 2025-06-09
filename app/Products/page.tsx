// app/Products/page.tsx
import { getTopOrderedProducts } from "@/lib/getTopOrderedProducts";

type ProductSummary = {
  name: string;
  totalOrders: number;
};

export default async function ProductsPage() {
  const products: ProductSummary[] = await getTopOrderedProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Ordered Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.name} className="p-4 border rounded shadow-sm">
              <div className="text-lg font-medium">{product.name}</div>
              <div className="text-gray-600">Total Ordered: {product.totalOrders}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
