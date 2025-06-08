"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getLatestOrders, UserRequest } from "@/lib/latestorders"; // ✅ fixed import

export default function DashboardPage() {
  const [orders, setOrders] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await getLatestOrders(5); // ✅ using correct function name
      setOrders(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Latest 5 Orders
          </h1>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
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
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Courier</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Links</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr key={index}>
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
