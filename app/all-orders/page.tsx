import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";

type UserRequest = {
  Address: string;
  Courier: string;
  "Customer-Name": string;
  Description: string;
  "Phone-Number": string;
  "Product-Links": string[];
  "Product-Name": string;
  "Product-Price": string;
  Quantity: string;
  Time: Timestamp;
  "User-Email": string;
};

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Add sidebar collapse state here:
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "user_request"));
        const data: UserRequest[] = querySnapshot.docs.map(
          (doc) => doc.data() as UserRequest
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Pass required props here */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            All Orders
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-200 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Price (BDT)</th>
                    <th className="px-4 py-3">Courier</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Links</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">{order["Customer-Name"]}</td>
                      <td className="px-4 py-3">{order["User-Email"]}</td>
                      <td className="px-4 py-3">{order["Phone-Number"]}</td>
                      <td className="px-4 py-3">{order["Product-Name"]}</td>
                      <td className="px-4 py-3">{order.Quantity}</td>
                      <td className="px-4 py-3">{order["Product-Price"]}</td>
                      <td className="px-4 py-3">{order.Courier}</td>
                      <td className="px-4 py-3">
                        {order.Time?.toDate?.().toLocaleString() || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <ul className="list-disc pl-4">
                          {order["Product-Links"]?.map((link, i) => (
                            <li key={i}>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                Link {i + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </td>
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
