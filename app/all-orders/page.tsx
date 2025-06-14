"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";
import { LayoutList, LayoutGrid } from "lucide-react"; // Lucide icons

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

type ColumnKey =
  | "Customer-Name"
  | "User-Email"
  | "Phone-Number"
  | "Product-Name"
  | "Quantity"
  | "Product-Price"
  | "Courier"
  | "Time"
  | "Product-Links";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [minimal, setMinimal] = useState(false);

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

  const columnsFull: { key: ColumnKey; label: string }[] = [
    { key: "Customer-Name", label: "Name" },
    { key: "User-Email", label: "Email" },
    { key: "Phone-Number", label: "Phone" },
    { key: "Product-Name", label: "Product" },
    { key: "Quantity", label: "Quantity" },
    { key: "Product-Price", label: "Price (BDT)" },
    { key: "Courier", label: "Courier" },
    { key: "Time", label: "Time" },
    { key: "Product-Links", label: "Links" },
  ];

  const columnsMinimal: { key: ColumnKey; label: string }[] = [
    { key: "Customer-Name", label: "Name" },
    { key: "Phone-Number", label: "Phone" },
    { key: "Product-Name", label: "Product" },
    { key: "Quantity", label: "Quantity" },
    { key: "Product-Price", label: "Price (BDT)" },
    { key: "Product-Links", label: "Links" },
  ];

  const columns = minimal ? columnsMinimal : columnsFull;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`flex-grow p-6 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header + Toggle View */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>

            <button
              onClick={() => setMinimal(!minimal)}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow transition"
            >
              {minimal ? (
                <>
                  <LayoutList className="w-5 h-5 text-gray-700" />
                  Full View
                </>
              ) : (
                <>
                  <LayoutGrid className="w-5 h-5 text-gray-700" />
                  Minimal View
                </>
              )}
            </button>
          </div>

          {/* Total Orders Count */}
          {!loading && (
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 lg:w-1/3">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Total Orders
              </h2>
              <p className="text-4xl font-bold text-indigo-600">
                {orders.length}
              </p>
            </div>
          )}

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-600">No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-200 text-xs uppercase text-gray-700">
                    <tr>
                      {columns.map(({ key, label }) => (
                        <th key={key} className="px-4 py-3 whitespace-nowrap">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        {columns.map(({ key }) => {
                          if (key === "Time") {
                            return (
                              <td key={key} className="px-4 py-3">
                                {order.Time?.toDate?.().toLocaleString() ?? "N/A"}
                              </td>
                            );
                          }
                          if (key === "Product-Links") {
                            return (
                              <td key={key} className="px-4 py-3">
                                <div className="flex flex-wrap gap-2">
                                  {order["Product-Links"]?.map((link, i) => (
                                    <a
                                      key={i}
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow hover:bg-indigo-600 transition"
                                    >
                                      Link-{i + 1}
                                    </a>
                                  ))}
                                </div>
                              </td>
                            );
                          }
                          return (
                            <td key={key} className="px-4 py-3">
                              {order[key] ?? "N/A"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
