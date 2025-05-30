// app/dashboard/layout.tsx
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
