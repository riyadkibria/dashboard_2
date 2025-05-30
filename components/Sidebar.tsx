// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Overview", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "Analytics", href: "/dashboard/analytics" },
];

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-40 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="h-full p-4 md:p-6 flex flex-col">
          <h2 className={cn("text-2xl font-bold text-gray-800 mb-10 tracking-tight transition-opacity", isCollapsed && "opacity-0")}>
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
                    "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
                    isActive
                      ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-500",
                    isCollapsed && "justify-center"
                  )}
                >
                  {!isCollapsed && link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
