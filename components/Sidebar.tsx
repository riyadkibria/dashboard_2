"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const links = [
  { name: "Overview", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "Analytics", href: "/dashboard/analytics" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  // Optional: Automatically close on route change (mobile UX)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // run initially
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  return (
    <aside
      className={cn(
        "bg-white border-r h-full fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {!isCollapsed && (
        <h2 className="text-2xl font-bold text-gray-800 px-4 mb-6 tracking-tight">
          Admin Panel
        </h2>
      )}

      <nav className="space-y-2 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
              )}
            >
              {isCollapsed ? (
                <div className="w-full text-center">{link.name[0]}</div>
              ) : (
                link.name
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

