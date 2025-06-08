"use client";

import { useEffect, useState } from "react";
import { db } from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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
  Time: any;
  "User-Email": string;
};

export default function FetchData() {
  const [requests, setRequests] = useState<UserRequest[]>([]);

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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Requests</h1>
      {requests.map((req, i) => (
        <div key={i} className="mb-6 p-4 border rounded shadow-sm bg-white">
          <p><strong>Name:</strong> {req["Customer-Name"]}</p>
          <p><strong>Email:</strong> {req["User-Email"]}</p>
          <p><strong>Phone:</strong> {req["Phone-Number"]}</p>
          <p><strong>Product:</strong> {req["Product-Name"]}</p>
          <p><strong>Quantity:</strong> {req.Quantity}</p>
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

          <p><strong>Time:</strong> {req.Time?.toDate?.().toLocaleString() || "N/A"}</p>
        </div>
      ))}
    </div>
  );
}
