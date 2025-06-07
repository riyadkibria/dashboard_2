import { useEffect, useState } from "react";
import { fetchAllOrders, Order } from "@/lib/fetchOrders"; // using @
import { db } from "@/lib/firebase"; // Firebase is now imported from @

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                marginBottom: "1.5rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "1rem",
              }}
            >
              <p><strong>User ID:</strong> {order.userId}</p>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Mobile:</strong> {order.mobile}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Product:</strong> {order.productName}</p>
              <p><strong>Price:</strong> ${order.productPrice}</p>
              <p><strong>Created At:</strong> {order.createdAt?.toDate().toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
