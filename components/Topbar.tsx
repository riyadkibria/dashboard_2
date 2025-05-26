// components/Topbar.tsx
export default function Topbar() {
  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="text-sm text-gray-500">Logged in as Admin</div>
    </header>
  );
}
