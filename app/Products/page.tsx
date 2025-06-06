// app/Products/page.tsx
import { getSingleName } from '@/lib/getSingleName';

export default async function ProductsPage() {
  // Pass the document ID here:
  const docId = 'miB2BpABeOC1arOqM2hp';
  const nameData = await getSingleName(docId);

  return (
    <div>
      <h1>Product Name Data</h1>
      <pre>{JSON.stringify(nameData, null, 2)}</pre>
    </div>
  );
}
