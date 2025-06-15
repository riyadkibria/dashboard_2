"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";
import {
  LayoutList,
  LayoutGrid,
  User,
  Phone,
  Package,
  ShoppingCart,
  DollarSign,
  Truck,
  Clock,
  Link as LinkIcon,
  Mail,
  Search,
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredOrders = orders.filter((order) =>
    [order["Customer-Name"], order["Phone-Number"], order["Product-Name"]]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columnsFull: { key: ColumnKey; label: string }[] = [
    { key: "Customer-Name", label: "Name" },
    { key: "User-Email", label: "Email" },
    { key: "Phone-Number", label: "Phone" },
    { key: "Product-Name", label: "Product" },
    { key: "Quantity", label: "Quantity" },
    { key: "Product-Price", label: "Price (BDT)" },
    { key: "Courier", label: "Courier" },
    { key: "Time", label: "Date" },
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

  const iconMap: Record<ColumnKey, React.ReactNode> = {
    "Customer-Name": <User className="w-3 h-3 text-indigo-500 inline mr-1" />,
    "User-Email": <Mail className="w-3 h-3 text-pink-500 inline mr-1" />,
    "Phone-Number": <Phone className="w-3 h-3 text-green-500 inline mr-1" />,
    "Product-Name": <Package className="w-3 h-3 text-yellow-500 inline mr-1" />,
    Quantity: <ShoppingCart className="w-3 h-3 text-purple-500 inline mr-1" />,
    "Product-Price": <DollarSign className="w-3 h-3 text-emerald-500 inline mr-1" />,
    Courier: <Truck className="w-3 h-3 text-blue-500 inline mr-1" />,
    Time: <Clock className="w-3 h-3 text-gray-500 inline mr-1" />,
    "Product-Links": <LinkIcon className="w-3 h-3 text-white" />,
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`flex-grow p-4 transition-all duration-300 ${
          isCollapsed ? "ml-16 max-w-full" : "ml-64 max-w-[calc(100%-16rem)]"
        }`}
      >
        <div className="space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-800">All Orders</h1>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, phone, product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-full shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              </div>

              <button
                onClick={() => setMinimal(!minimal)}
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded shadow text-xs"
              >
                {minimal ? (
                  <>
                    <LayoutList className="w-4 h-4" />
                    Full View
                  </>
                ) : (
                  <>
                    <LayoutGrid className="w-4 h-4" />
                    Minimal View
                  </>
                )}
              </button>
            </div>
          </div>

          {!loading && (
            <div className="bg-white shadow rounded p-4 w-full text-xs">
              <h2 className="font-semibold text-gray-700 mb-1">Total Orders</h2>
              <p className="text-2xl font-bold text-indigo-600">
                {filteredOrders.length}
              </p>
            </div>
          )}

          <div className="bg-white rounded shadow p-4 overflow-x-auto">
            {loading ? (
              <p className="text-center text-gray-500 text-sm">Loading...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">No orders found.</p>
            ) : (
              <table className="text-sm text-left text-gray-700 min-w-full">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    {columns.map(({ key, label }) => (
                      <th
                        key={key}
                        className="px-3 py-2 whitespace-nowrap font-semibold"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      {columns.map(({ key }) => {
                        if (key === "Time") {
                          const dateStr =
                            order.Time?.toDate?.().toISOString().split("T")[0] ?? "N/A";
                          return (
                            <td key={key} className="px-3 py-2 whitespace-nowrap">
                              <span className="flex items-center gap-1">
                                {iconMap[key]}
                                {dateStr}
                              </span>
                            </td>
                          );
                        }

                        if (key === "Product-Links") {
                          return (
                            <td key={key} className="px-3 py-2 whitespace-nowrap">
                              <div className="flex flex-wrap gap-2">
                                {order["Product-Links"]?.map((link, i) => (
                                  <a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] px-3 py-1 rounded-full shadow hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition"
                                  >
                                    <LinkIcon className="w-3 h-3" />
                                    Link-{i + 1}
                                  </a>
                                ))}
                              </div>
                            </td>
                          );
                        }

                        return (
                          <td key={key} className="px-3 py-2 whitespace-nowrap max-w-[200px] break-words">
                            <span className="flex items-center gap-1">
                              {iconMap[key]}
                              {order[key] ?? "N/A"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}



