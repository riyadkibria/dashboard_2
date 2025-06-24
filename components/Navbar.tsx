"use client";

import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Navbar({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const submenuRef = useRef<HTMLUListElement>(null);

  // Close submenu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setAboutOpen(false);
      }
    }
    if (aboutOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-md px-8 py-4 flex items-center justify-between transition-colors duration-300">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-indigo-600 tracking-wide select-none">
        MySite
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-10 text-gray-700 font-semibold tracking-wide">
        <li>
          <a
            href="#"
            className="relative group px-2 py-1 hover:text-indigo-600 transition"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
          </a>
        </li>

        <li className="relative">
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition font-semibold"
            aria-haspopup="true"
            aria-expanded={aboutOpen}
          >
            About <FaChevronDown className="text-xs mt-[2px]" />
          </button>

          {/* Submenu */}
          {aboutOpen && (
            <ul
              ref={submenuRef}
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
              className="absolute top-11 left-0 bg-white shadow-xl border border-gray-200 rounded-lg w-44 py-3 text-sm text-gray-700 font-normal z-50 animate-fade-in"
            >
              <li>
                <a
                  href="#"
                  className="block px-5 py-2 hover:bg-indigo-50 hover:text-indigo-700 transition rounded-md"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-5 py-2 hover:bg-indigo-50 hover:text-indigo-700 transition rounded-md"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-5 py-2 hover:bg-indigo-50 hover:text-indigo-700 transition rounded-md"
                >
                  Careers
                </a>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a
            href="#"
            className="relative group px-2 py-1 hover:text-indigo-600 transition font-semibold"
          >
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
          </a>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="md:hidden text-3xl text-gray-700 hover:text-indigo-600 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Animation keyframes for fade-in (add to your global CSS or tailwind config) */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease forwards;
        }
      `}</style>
    </nav>
  );
}
