// app/dashboard/layout.tsx
"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
