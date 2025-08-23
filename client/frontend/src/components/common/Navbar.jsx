import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react"; // Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-[#234436]/60 fixed top-0 left-0 w-full z-50 backdrop-blur-sm">

        {/* Mobile Left Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide text-white md:text-2xl">
          NCR Farms
        </h1>

        {/* Desktop Menu (center) */}
        <div className="hidden md:flex flex-1 justify-center space-x-10 text-white font-medium">
          <a href="#" className="hover:text-yellow-400">Properties</a>
          <a href="#" className="hover:text-yellow-400">Blog</a>
          <a href="#" className="hover:text-yellow-400">About Us</a>
          <a href="#" className="hover:text-yellow-400">Contact Us</a>
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
          <li><a href="#">Properties</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
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
