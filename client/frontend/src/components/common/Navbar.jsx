import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react"; // Icons
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-[#234436]/60 fixed top-0 left-0 w-full z-50 ">

        {/* Mobile Left Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-wide text-white md:text-2xl hover:text-yellow-400"
          style={{ textDecoration: 'none' }}
        >
          NCR Farms
        </NavLink>

        {/* Desktop Menu (center) */}
        <div className="hidden md:flex flex-1 justify-center space-x-10 text-white font-medium">
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
            }
          >
            Properties
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Search Button (Right) */}
        <button className="hidden md:flex items-center bg-yellow-500 text-black font-semibold px-4 py-1 rounded">
          <Search className="w-4 h-4 mr-2" />
          Search
        </button>

        {/* Mobile Search (only icon) */}
        <button className="md:hidden">
          <Search className="w-6 h-6 text-white" />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-[70%] w-full bg-[#2D5D4F] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:hidden`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 mt-14">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-6 p-6 text-lg">
          <li>
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
              }
              onClick={() => setIsOpen(false)}
            >
              Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
              }
              onClick={() => setIsOpen(false)}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
              }
              onClick={() => setIsOpen(false)}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"
              }
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;