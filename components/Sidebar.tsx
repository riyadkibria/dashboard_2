"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  BarChart,
  LogIn,
  LogOut,
} from "lucide-react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase"; // your initialized Firebase app

const links = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "All-Orders", href: "/all-orders", icon: ShoppingCart },
  { name: "Products", href: "/Products", icon: Package },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
];

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 flex flex-col justify-between z-30",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div>
        {/* Top Logo / Collapse */}
        <div
          className={cn(
            "flex items-center justify-between py-6",
            isCollapsed ? "px-2 justify-center" : "px-4"
          )}
        >
          {!isCollapsed && <h2 className="text-xl font-bold text-gray-800">Admin</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-100 transition"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <ChevronRight size={20} className="text-gray-600 hover:text-blue-600" />
            ) : (
              <ChevronLeft size={20} className="text-gray-600 hover:text-blue-600" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 px-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                )}
              >
                <Icon className="w-5 h-5 mr-2 shrink-0" />
                {!isCollapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sign In / Sign Out */}
      <div className="px-2 pb-4">
        {user ? (
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5 mr-2" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        ) : (
          <Link
            href="/login" // 🔑 change to your login route
            className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-green-600 hover:bg-green-50 transition"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {!isCollapsed && <span>Sign In</span>}
          </Link>
        )}
      </div>
    </aside>
  );
}
