"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  Box,
  Users,
  Settings,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block fixed top-4 left-64 z-40 p-1 bg-white shadow-md rounded-r-md"
        style={{
          left: isCollapsed ? "4rem" : "16rem", // shift the button depending on sidebar width
          transition: "left 0.3s ease",
        }}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-30 transition-all duration-300 md:flex flex-col",
          isMobileOpen
            ? "w-64 p-6"
            : isCollapsed
            ? "w-16 p-2"
            : "hidden md:w-64 md:p-6"
        )}
      >
        {/* Sidebar Header */}
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-gray-800 mb-10 tracking-tight">
            Admin Panel
          </h2>
        )}

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-2">
          {links.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-500",
                  isCollapsed ? "justify-center px-2" : ""
                )}
              >
                <Icon className={isCollapsed ? "" : "mr-3"} size={20} />
                {!isCollapsed && name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

