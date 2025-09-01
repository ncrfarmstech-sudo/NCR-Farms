import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/properties', label: 'Properties' },
  { to: '/featured-products', label: 'Featured Products' },
  { to: '/blog', label: 'Blog' },
  { to: '/contactus', label: 'Contact Us' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login'); // redirect to login page after logout
  };
  return (
    <nav className="fixed left-0 top-0 h-screen w-60 bg-gradient-to-b from-[#2D5D4F] to-[#3a7d6a] text-white flex flex-col items-center pt-6 z-20 shadow-xl">
      <div className="flex flex-col items-center w-full mb-10">
        <div className="text-3xl font-extrabold tracking-wide mb-2 text-[#e6f4ee]">NCR Farms</div>
        <div className="w-12 h-1 rounded bg-[#659285] mb-2"></div>
        <div className="text-xs text-[#b2d8c5]">Admin Panel</div>
      </div>
      <ul className="w-full flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <li key={item.to} className="w-full">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-7 py-3 w-full font-medium text-lg rounded-l-full transition-all duration-200 relative ${isActive ? 'bg-[#e6f4ee] text-[#2D5D4F] shadow-md' : 'hover:bg-[#3a7d6a] hover:text-[#e6f4ee]'}`
              }
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded bg-[#659285] transition-all duration-200 opacity-0 group-[.active]:opacity-100 group-[.active]:w-2"></span>
              {item.label}
            </NavLink>
          </li>
        ))}
        <li className="w-full mt-auto mb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-7 py-3 rounded-l-full bg-gradient-to-r from-[#fa8f88] to-[#f05a28] hover:from-[#f05a28] hover:to-[#fa8f88] text-white font-semibold shadow-md transition-all duration-200 text-left"
            style={{ letterSpacing: '0.5px' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
