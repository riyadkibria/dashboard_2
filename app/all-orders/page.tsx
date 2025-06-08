import FetchData from "@/components/FetchData"; // Adjust the path if needed

export default function AllOrdersPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>
        <FetchData />
      </div>
    </main>
  );
}
