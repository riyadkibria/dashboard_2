// app/Products/page.tsx
import { getSingleName } from '@/lib/getSingleName';

export default async function ProductsPage() {
  const nameData = await getSingleName();

  return (
    <div>
      <h1>Product Name Data</h1>
      <pre>{JSON.stringify(nameData, null, 2)}</pre>
    </div>
  );
}
