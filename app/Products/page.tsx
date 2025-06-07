// app/Products/page.tsx
import { fetchNames, CustomerData } from '@/lib/fetchNames';

export default async function ProductsPage() {
  const allCustomers: CustomerData[] = await fetchNames();

  return (
    <main style={styles.container}>
      <section style={styles.card}>
        <h1 style={styles.title}>All Customers</h1>

        {allCustomers.length > 0 ? (
          <div style={styles.dataContainer}>
            {allCustomers.map((customer) => (
              <div key={customer.id}>
                <p>
                  <strong>ID:</strong> {customer.id}
                </p>
                <p>
                  <strong>Name:</strong> {customer.name}
                </p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.error}>No customers found.</p>
        )}
      </section>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '3rem 2rem',
    backgroundColor: '#f9fafb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  } as React.CSSProperties,
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem 3rem',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    maxWidth: 480,
    width: '100%',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '1.9rem',
    marginBottom: '1.5rem',
    color: '#111827',
  },
  dataContainer: {
    fontSize: '1.2rem',
    color: '#374151',
    lineHeight: 1.6,
  },
  error: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: '1.1rem',
  },
};
