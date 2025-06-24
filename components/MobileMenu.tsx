"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div
      className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-md flex flex-col pt-20 px-6 text-gray-100 font-medium"
      // pt-20 to leave space for navbar
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-6 right-6 text-3xl text-gray-100 hover:text-indigo-400 transition"
      >
        <FaTimes />
      </button>

      <ul className="space-y-8 text-lg flex flex-col items-start">
        {/* Home */}
        <li>
          <a href="#" className="block hover:text-indigo-400 transition">
            Home
          </a>
        </li>

        {/* About with submenu */}
        <li className="w-full">
          <button
            onClick={() => toggleSubmenu("about")}
            className="flex items-center justify-between w-full hover:text-indigo-400 transition"
          >
            <span>About</span>
            {openSubmenu === "about" ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {openSubmenu === "about" && (
            <ul className="pl-6 mt-4 space-y-4 text-base text-gray-300">
              <li>
                <a href="#" className="block hover:text-indigo-400 transition">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-indigo-400 transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-indigo-400 transition">
                  Careers
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Contact */}
        <li>
          <a href="#" className="block hover:text-indigo-400 transition">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}
