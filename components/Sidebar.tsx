// components/Sidebar.tsx
import Link from "next/link";

const links = [
  { name: "Overview", href: "/dashboard" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Customers", href: "/dashboard/customers" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className="block p-2 rounded hover:bg-gray-100"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
