import React, { useState } from "react";
import { Menu, Search, X, ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Example recent searches
    const recentSearches = [
        "Luxury Farmhouse in Gurgaon",
        "5 Acre Farm Land Sohna",
        "Agriculture Land Greater Noida",
        "Farmhouse with Pool Manesar",
        "10 Bigha Agriculture Plot",
        "Weekend Farmhouse Faridabad",
    ];

    return (
        <>
            {/* Fixed Navbar */}
            <nav className="flex items-center justify-between px-6 py-3 bg-[#234436]/60 fixed top-0 left-0 w-full z-50">
                {/* Mobile Left Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(true)}>
                    <Menu className="w-6 h-6 text-white" />
                </button>

                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-xl font-bold tracking-wide text-white md:text-2xl hover:text-yellow-400"
                    style={{ textDecoration: "none" }}
                >
                    NCR Farms
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-1 justify-center space-x-10 text-white font-medium">
                    <NavLink
                        to="/properties"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 underline"
                                : "hover:text-yellow-400"
                        }
                    >
                        Properties
                    </NavLink>
                    <NavLink
                        to="/blog"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 underline"
                                : "hover:text-yellow-400"
                        }
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 underline"
                                : "hover:text-yellow-400"
                        }
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contactus"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 underline"
                                : "hover:text-yellow-400"
                        }
                    >
                        Contact Us
                    </NavLink>
                </div>

                {/* Desktop Search Button */}
                <button
                    className="hidden md:flex items-center bg-yellow-500 text-black font-semibold px-4 py-1 rounded"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                </button>

                {/* Mobile Search Icon */}
                <button
                    className="md:hidden"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <Search className="w-6 h-6 text-white" />
                </button>
            </nav>

            {/* ---------------- Search Popup ---------------- */}
            {isSearchOpen && (
                <>
                    {/* Desktop Search Popup */}
                    <div className="hidden md:flex fixed inset-0 bg-black/60 z-50 items-start justify-center p-4">
                        <div className="bg-[#1c3a32] w-full max-w-2xl rounded-lg shadow-lg p-6 mt-20">
                            {/* Search Input */}
                            <div className="flex items-center bg-[#234436] px-4 py-2 rounded-md">
                                <Search className="w-5 h-5 text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Search Built up farmhouse"
                                    className="bg-transparent outline-none px-3 text-white flex-1"
                                />
                                <button onClick={() => setIsSearchOpen(false)}>
                                    <X className="w-5 h-5 text-gray-300 hover:text-white" />
                                </button>
                            </div>

                            {/* Recent Searches */}
                            <div className="mt-6">
                                <h3 className="text-yellow-400 font-semibold flex items-center mb-4">
                                    Recent Searches
                                </h3>

                                <div className="grid grid-cols-2 gap-6 text-gray-200">
                                    {recentSearches.map((item, idx) => (
                                        <button
                                            key={idx}
                                            className="flex justify-between items-center w-full hover:text-yellow-400"
                                        >
                                            {item}
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Fullscreen */}
                    <div className="md:hidden fixed inset-0 bg-[#fdf8f3] z-50 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#234436] text-white">
                            <h2 className="text-lg font-bold mx-auto">NCR</h2>
                            <button onClick={() => setIsSearchOpen(false)}>
                                <X className="w-6 h-8" />
                            </button>
                        </div>

                        {/* Search Input (slightly up for mobile) */}
                        <div className="px-4 mt-[-0.6rem]">
                            <div className="flex items-center bg-white shadow px-4 py-2 rounded-md">
                                <input
                                    type="text"
                                    placeholder="Search Built up farmhouse"
                                    className="bg-transparent outline-none flex-1 text-gray-700"
                                />
                                <Search className="w-5 h-8 text-gray-500" />
                            </div>
                        </div>

                        {/* Recent Searches */}
                        <div className="px-4 py-2 overflow-y-auto mt-4">
                            <h3 className="text-gray-700 font-semibold flex items-center mb-3">
                                <span className="mr-2">⏺</span> Recent Searches
                            </h3>

                            <ul className="space-y-3">
                                {recentSearches.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex justify-between items-center border-b border-gray-200 pb-2"
                                    >
                                        <span className="text-gray-800">
                                            {item}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-gray-500" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {/* ---------------- Mobile Sidebar ---------------- */}
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
                                isActive
                                    ? "text-yellow-400 underline"
                                    : "hover:text-yellow-400"
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
                                isActive
                                    ? "text-yellow-400 underline"
                                    : "hover:text-yellow-400"
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
                                isActive
                                    ? "text-yellow-400 underline"
                                    : "hover:text-yellow-400"
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
                                isActive
                                    ? "text-yellow-400 underline"
                                    : "hover:text-yellow-400"
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Sidebar Backdrop */}
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
