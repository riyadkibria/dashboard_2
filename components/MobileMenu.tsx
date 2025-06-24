export default function MobileMenu() {
  return (
    <ul className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4 text-gray-700 font-medium fixed top-[72px] left-0 right-0 z-40">
      <li><a href="#" className="block hover:text-indigo-600">Home</a></li>
      <li><a href="#" className="block hover:text-indigo-600">About</a></li>
      <li><a href="#" className="block hover:text-indigo-600">Contact</a></li>
    </ul>
  );
}
