"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, ChevronLeft, ChevronRight, Home, ShoppingCart, Box, Users, Settings, BarChart2 } from "lucide-react";

const links = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Products", href: "/dashboard/products", icon: Box },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block fixed top-4 left-64 z-40 bg-white p-1 rounded-r-md shadow-md"
        style={{ transform: isCollapsed ? "translateX(-15rem)" : "translateX(0)" }}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-30 p-6 transition-all duration-300 flex flex-col",
          isMobileOpen ? "w-64" : "w-0 overflow-hidden md:w-64 md:overflow-auto",
          isCollapsed && "md:w-16"
        )}
      >
        <h2
          className={cn(
            "text-2xl font-bold text-gray-800 mb-10 tracking-tight transition-opacity duration-300",
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}
        >
          Admin Panel
        </h2>

        <nav className="flex flex-col space-y-2">
          {links.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={cn(
                  "flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-500",
                  isCollapsed ? "justify-center px-2" : ""
                )}
              >
                <Icon className="mr-3" size={20} />
                {!isCollapsed && name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}


