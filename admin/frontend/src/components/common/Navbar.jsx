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
    navigate(0); // reloads the app to force logout state
  };
  return (
    <nav className="fixed left-0 top-0 h-screen w-56 bg-gray-900 text-white flex flex-col items-center pt-8 z-20">
      <div className="text-2xl font-bold mb-10">AdminPanel</div>
      <ul className="w-full">
        {navItems.map((item) => (
          <li key={item.to} className="w-full mb-5">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block px-8 py-3 rounded transition-colors duration-200 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        <li className="w-full mt-10">
          <button
            onClick={handleLogout}
            className="w-full block px-8 py-3 rounded bg-red-600 hover:bg-red-700 text-white text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
