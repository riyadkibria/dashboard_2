
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block fixed top-4 left-64 z-40 bg-white p-1 rounded-r-md shadow-md"
        style={{ transform: isCollapsed ? "translateX(-15rem)" : "" }}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-30 p-6 transition-all duration-300",
          isMobileOpen
            ? "w-64"
            : "w-0 overflow-hidden md:w-64 md:overflow-auto",
          isCollapsed && "md:w-16",
          "md:static md:flex flex-col"
        )}
      >
        <div className="flex flex-col h-full">
          <h2
            className={cn(
              "text-2xl font-bold text-gray-800 mb-10 tracking-tight transition-all duration-300",
              isCollapsed && "opacity-0 h-0 overflow-hidden"
            )}
          >
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
                    isCollapsed && "justify-center px-2 text-xs"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
