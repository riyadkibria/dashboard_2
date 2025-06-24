import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (val: boolean) => void }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-indigo-600">MySite</div>
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><a href="#" className="hover:text-indigo-600">Home</a></li>
        <li><a href="#" className="hover:text-indigo-600">About</a></li>
        <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
      </ul>
      <button className="md:hidden text-2xl text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}
