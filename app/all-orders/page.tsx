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
  X,
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
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data = snapshot.docs.map((doc) => doc.data()) as UserRequest[];
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) =>
    [o["Customer-Name"], o["Phone-Number"], o["Product-Name"]]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const customerOrders = selectedCustomer
    ? orders.filter((o) => o["Customer-Name"] === selectedCustomer)
    : [];

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
    "Product-Links": <LinkIcon className="w-3 h-3 text-indigo-400 inline mr-1" />,
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`p-4 transition-all duration-300 w-full ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
            <div className="relative w-full sm:w-96">
              <Search className="absolute top-2.5 left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <button
              onClick={() => setMinimal(!minimal)}
              className="inline-flex items-center gap-2 bg-white border hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md shadow text-xs"
            >
              {minimal ? <><LayoutList className="w-4 h-4" /> Full View</> 
                         : <><LayoutGrid className="w-4 h-4" /> Minimal View</>}
            </button>
          </div>

          {!loading && (
            <div className="bg-white shadow rounded p-4 text-xs w-full max-w-sm">
              <h2 className="font-semibold text-gray-700 mb-1">Total Orders</h2>
              <p className="text-2xl font-bold text-indigo-600">
                {filteredOrders.length}
              </p>
            </div>
          )}

          <div className="bg-white rounded shadow p-4 overflow-auto">
            {loading ? (
              <p className="text-center text-gray-500 text-sm">Loading...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">No orders found.</p>
            ) : (
              <table className="text-sm text-left text-gray-700 min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    {columns.map(({ key, label }) => (
                      <th key={key} className="px-3 py-2 whitespace-nowrap font-semibold">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {columns.map(({ key }) => {
                        if (key === "Customer-Name") {
                          return (
                            <td key={key} className="px-3 py-2 whitespace-normal">
                              <button
                                onClick={() => setSelectedCustomer(order["Customer-Name"])}
                                className="flex items-center gap-1 font-medium text-indigo-600 hover:underline"
                              >
                                {iconMap[key]}
                                {order[key]}
                              </button>
                            </td>
                          );
                        }
                        if (key === "Time") {
                          const dateStr =
                            order.Time?.toDate().toISOString().split("T")[0] || "N/A";
                          return (
                            <td key={key} className="px-3 py-2 whitespace-nowrap flex items-center gap-1">
                              {iconMap[key]}
                              {dateStr}
                            </td>
                          );
                        }
                        if (key === "Product-Links") {
                          return (
                            <td key={key} className="px-3 py-2 whitespace-nowrap">
                              <div className="flex flex-wrap gap-2">
                                {order["Product-Links"].map((link, li) => (
                                  <a
                                    key={li}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] px-3 py-1 rounded-full shadow hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition"
                                  >
                                    <LinkIcon className="w-3 h-3" />
                                    Link-{li + 1}
                                  </a>
                                ))}
                              </div>
                            </td>
                          );
                        }
                        return (
                          <td key={key} className="px-3 py-2 flex items-center gap-1 max-w-[200px] break-words whitespace-normal">
                            {iconMap[key]}
                            {order[key]}
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

      {/* Side Panel Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex">
          <div className="ml-auto w-full max-w-md bg-white h-full shadow-xl p-4 overflow-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedCustomer(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-2">{selectedCustomer}</h2>
            {customerOrders[0] && (
              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-1">
                  <Mail /> {customerOrders[0]["User-Email"]}
                </p>
                <p className="flex items-center gap-1">
                  <Phone /> {customerOrders[0]["Phone-Number"]}
                </p>
              </div>
            )}
            <h3 className="font-semibold mb-1">Orders:</h3>
            <ul className="space-y-2">
              {customerOrders.map((o, idx) => (
                <li key={idx} className="p-2 border rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">{o["Product-Name"]}</span>
                    <span className="text-sm text-gray-500">
                      {o.Quantity} × {o["Product-Price"]} BDT
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(o.Time.toDate()).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
