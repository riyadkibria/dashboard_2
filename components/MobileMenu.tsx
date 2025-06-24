"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function MobileMenu() {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <ul className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4 text-gray-700 font-medium fixed top-[72px] left-0 right-0 z-40">
      {/* Home */}
      <li>
        <a href="#" className="block hover:text-indigo-600">
          Home
        </a>
      </li>

      {/* About with submenu */}
      <li>
        <button
          onClick={() => toggleSubmenu("about")}
          className="flex items-center justify-between w-full hover:text-indigo-600"
        >
          <span>About</span>
          {openSubmenu === "about" ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {openSubmenu === "about" && (
          <ul className="pl-4 mt-2 space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="block hover:text-indigo-600">Our Team</a>
            </li>
            <li>
              <a href="#" className="block hover:text-indigo-600">Our Story</a>
            </li>
            <li>
              <a href="#" className="block hover:text-indigo-600">Careers</a>
            </li>
          </ul>
        )}
      </li>

      {/* Contact */}
      <li>
        <a href="#" className="block hover:text-indigo-600">
          Contact
        </a>
      </li>
    </ul>
  );
}
