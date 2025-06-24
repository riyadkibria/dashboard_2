"use client";

import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Navbar({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-indigo-600">MySite</div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium relative">
        <li>
          <a href="#" className="hover:text-indigo-600">
            Home
          </a>
        </li>

        <li
          onMouseEnter={() => setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen(false)}
          className="relative"
        >
          <button className="flex items-center gap-1 hover:text-indigo-600">
            About <FaChevronDown className="text-xs mt-[2px]" />
          </button>

          {/* Submenu */}
          {aboutOpen && (
            <ul className="absolute top-8 left-0 bg-white shadow-lg border rounded-lg w-40 py-2 text-sm text-gray-700 z-50">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Careers
                </a>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a href="#" className="hover:text-indigo-600">
            Contact
          </a>
        </li>
      </ul>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-2xl text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}
