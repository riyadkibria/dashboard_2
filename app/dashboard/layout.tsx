// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false); // sidebar starts expanded

  return (
    <div className="flex h-screen">
      {/* Sidebar with collapse state */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
