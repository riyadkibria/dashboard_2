"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // for hamburger icon (install lucide-react if needed)

const links = [
  { name: "Overview", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "Analytics", href: "/dashboard/analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-40 p-6 transition-all duration-300",
          isOpen ? "w-64" : "w-0 overflow-hidden",
          "md:static md:flex md:w-64 md:p-6"
        )}
      >
        {isOpen && (
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-10 tracking-tight">
              Admin Panel
            </h2>
            <nav className="space-y-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </aside>
    </>
  );
}
