import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, X, ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { GoArrowUpLeft } from "react-icons/go";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    // Persistent recent searches from localStorage
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('propertySearchHistory');
        return saved ? JSON.parse(saved) : [];
    });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Use actual user input if present; otherwise fall back to the animated word
        const query = (searchText && searchText.trim()) || displayTextRef.current || "";
        const trimmed = query.trim();
        if (trimmed) {
            const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 10);
            setRecentSearches(updated);
            localStorage.setItem('propertySearchHistory', JSON.stringify(updated));
            navigate(`/properties?search=${encodeURIComponent(trimmed)}`);
            setIsSearchOpen(false);
            // clear input if you want (optional)
            // setSearchText("");
        }
    };

    // ---------------- Typing effect setup ----------------
    const words = ["Agricultural land", "Built up farmhouse", "Farmland", "Gated Farmhouse"];

    // Visible placeholder (state)
    const [displayText, setDisplayText] = useState("");
    const displayTextRef = useRef(""); // keep ref for submit usage
    const wordIndexRef = useRef(0);
    const deletingRef = useRef(false);
    const charIndexRef = useRef(0);
    const timeoutRef = useRef(null);

    // Helper to clear any pending timeouts when popup closes or user types
    const clearTypingTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    // Core typing effect — runs only when search popup is open AND user hasn't typed anything
    useEffect(() => {
        // stop typing if popup closed
        if (!isSearchOpen) {
            clearTypingTimeout();
            setDisplayText("");
            displayTextRef.current = "";
            // reset counters for fresh start next open
            wordIndexRef.current = 0;
            deletingRef.current = false;
            charIndexRef.current = 0;
            return;
        }

        // if user typed, don't run animation
        if (searchText) {
            clearTypingTimeout();
            setDisplayText("");
            displayTextRef.current = "";
            deletingRef.current = false;
            charIndexRef.current = 0;
            return;
        }

        const run = () => {
            const currentWord = words[wordIndexRef.current];
            if (!deletingRef.current) {
                // typing forward
                charIndexRef.current = Math.min(charIndexRef.current + 1, currentWord.length);
                const next = currentWord.substring(0, charIndexRef.current);
                setDisplayText(next);
                displayTextRef.current = next;

                if (charIndexRef.current === currentWord.length) {
                    // pause at full word then start deleting
                    timeoutRef.current = setTimeout(() => {
                        deletingRef.current = true;
                        run();
                    }, 1400); // pause at full word
                    return;
                } else {
                    timeoutRef.current = setTimeout(run, 120); // typing speed
                }
            } else {
                // deleting
                charIndexRef.current = Math.max(0, charIndexRef.current - 1);
                const next = currentWord.substring(0, charIndexRef.current);
                setDisplayText(next);
                displayTextRef.current = next;

                if (charIndexRef.current === 0) {
                    // move to next word and start typing
                    deletingRef.current = false;
                    wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
                    timeoutRef.current = setTimeout(run, 200); // small gap before next word
                    return;
                } else {
                    timeoutRef.current = setTimeout(run, 60); // deleting speed
                }
            }
        };

        // start the run loop
        clearTypingTimeout();
        timeoutRef.current = setTimeout(run, 200); // slight initial delay

        // cleanup on unmount or dependency change
        return () => clearTypingTimeout();
    }, [isSearchOpen, searchText]); // restart whenever popup opens/closes or user types

    // keep displayTextRef in sync if component re-renders
    useEffect(() => {
        displayTextRef.current = displayText;
    }, [displayText]);

    // clear timeouts when component unmounts
    useEffect(() => {
        return () => clearTypingTimeout();
    }, []);

    // ---------------- UI (unchanged except placeholder/value handling) ----------------
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
                    onClick={() => {
                        setIsSearchOpen(true);
                        // reset animation counters when opening (optional)
                        // wordIndexRef.current = 0;
                        // deletingRef.current = false;
                        // charIndexRef.current = 0;
                    }}
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
                    {/* ---------------- Desktop Search Popup ---------------- */}

                    <div className="hidden md:flex fixed inset-0 bg-black/60 z-50 items-start justify-center p-6">
                        <div className="bg-[#1D3C33] w-full max-w-3xl rounded-md p-6 mt-24 relative">
                            {/* Search Bar Row */}
                            <div className="flex items-center space-x-3">
                                {/* Search Input Box */}

                                <form
                                    className="flex items-center bg-[#2D5D4F] px-4 rounded-md flex-1 h-12"
                                    onSubmit={handleSearchSubmit}
                                >
                                    <input
                                        type="text"
                                        // controlled by user input only
                                        value={searchText}
                                        placeholder={`Search  ${displayText || words[0]}`}
                                        className="bg-transparent outline-none text-gray-200 flex-1 placeholder-gray-400"
                                        onChange={e => {
                                            setSearchText(e.target.value);
                                            // when user types, stop animation clearing placeholder text visually
                                            if (e.target.value) {
                                                clearTypingTimeout();
                                                setDisplayText("");
                                                displayTextRef.current = "";
                                            } else {
                                                // if they clear input, restart animation by letting effect run
                                            }
                                        }}
                                    />
                                    <button type="submit">
                                        <Search className="w-5 h-5 text-gray-300 ml-2" />
                                    </button>
                                </form>

                                {/* Cross Icon in its own box */}
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        // optional: clear searchText when closing
                                        // setSearchText("");
                                    }}
                                    className="bg-[#2D5D4F] h-12 w-12 flex items-center justify-center rounded-md hover:bg-[#2a4c40]"
                                >
                                    <X className="w-5 h-5 text-gray-300 hover:text-white" />
                                </button>
                            </div>

                            {/* Recent Searches */}
                            <div className="mt-8  bg-[#2D5D4F] rounded-sm max-h-72 overflow-y-auto ">
                                <h3 className="text-yellow-400 font-semibold flex items-center m-3">
                                    <FiClock className="mr-2 text-yellow-400 w-5 h-5" />
                                    Recent Searches
                                </h3>

                                <div className="p-6 grid grid-cols-2 gap-x-20 gap-y-4 text-[#F8F4EC] m-3">
                                    {recentSearches.length === 0 ? (
                                        <span className="text-gray-400">No recent searches</span>
                                    ) : recentSearches.map((item, idx) => (
                                        <button
                                            key={idx}
                                            className="flex justify-between items-center w-full pb-2 border-b border-gray-200 hover:text-yellow-400 transition-colors truncate"
                                            onClick={() => {
                                                setSearchText(item);
                                                navigate(`/properties?search=${encodeURIComponent(item)}`);
                                                setIsSearchOpen(false);
                                            }}
                                        >
                                            <span className="truncate">
                                                {item}
                                            </span>
                                            <GoArrowUpLeft className="w-6 h-6 shrink-0 ml-2" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------------- Mobile Search Fullscreen ---------------- */}
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
                            <form className="flex items-center bg-white shadow px-4 py-2 rounded-md" onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    value={searchText}
                                    placeholder={`Search Built up ${displayText || words[0]}`}
                                    className="bg-transparent outline-none flex-1 text-gray-700"
                                    onChange={e => {
                                        setSearchText(e.target.value);
                                        if (e.target.value) {
                                            clearTypingTimeout();
                                            setDisplayText("");
                                            displayTextRef.current = "";
                                        }
                                    }}
                                />
                                <button type="submit">
                                    <Search className="w-5 h-8 text-gray-500" />
                                </button>
                            </form>
                        </div>

                        {/* Recent Searches */}
                        <div className="px-4 py-2 overflow-y-auto mt-4">
                            <h3 className="text-gray-700 font-semibold flex items-center mb-5">
                                <FiClock className="mr-2 text-gray-700 w-5 h-5" />Recent Searches
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
                className={`fixed top-0 left-0 h-[70%] w-full bg-[#2D5D4F] text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
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
