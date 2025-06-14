"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

// ✅ Lucide Icons
import { Phone, Mail, ShoppingCart } from "lucide-react";

// ✅ Correct type for each user request
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

export default function FetchData() {
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "user_request"));
        const data: UserRequest[] = querySnapshot.docs.map(
          (doc) => doc.data() as UserRequest
        );
        setRequests(data);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Requests</h1>
      {requests.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        requests.map((req, i) => (
          <div
            key={i}
            className="mb-6 p-4 border rounded shadow-sm bg-white space-y-2"
          >
            <p>
              <strong>Name:</strong> {req["Customer-Name"]}
            </p>

            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <span><strong>Email:</strong> {req["User-Email"]}</span>
            </p>

            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-600" />
              <span><strong>Phone:</strong> {req["Phone-Number"]}</span>
            </p>

            <p><strong>Product:</strong> {req["Product-Name"]}</p>

            <p className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-gray-600" />
              <span><strong>Quantity:</strong> {req.Quantity}</span>
            </p>

            <p><strong>Price:</strong> {req["Product-Price"]} BDT</p>
            <p><strong>Courier:</strong> {req.Courier}</p>
            <p><strong>Address:</strong> {req.Address}</p>
            <p><strong>Description:</strong> {req.Description}</p>

            <div>
              <strong>Product Links:</strong>
              <ul className="list-disc ml-5">
                {req["Product-Links"]?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <strong>Time:</strong>{" "}
              {req.Time?.toDate().toLocaleString() || "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
