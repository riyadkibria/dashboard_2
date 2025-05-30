// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ✅ Pass props here */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          isCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        <Topbar />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
