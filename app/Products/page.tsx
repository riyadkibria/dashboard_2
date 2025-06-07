// app/Products/page.tsx (or any React component)

import React, { useEffect, useState } from 'react';
import { fetchNames } from '../lib/fetchNames';  // adjust the path

export default function ProductsPage() {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await fetchNames();
      setNames(data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Names</h1>
      {names.length > 0 ? (
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>No names found.</p>
      )}
    </div>
  );
}

