import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ customItems = null }) => {
    const location = useLocation();

    // If custom items are provided, use them
    if (customItems) {
        return (
            <nav className="bg-[#f3e9db] py-3 px-4 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <ol className="flex items-center space-x-2 text-sm">
                        <li>
                            <Link 
                                to="/" 
                                className="flex items-center text-[#2D5D4F] hover:text-[#1a3d2e] transition"
                            >
                                <FaHome className="mr-1" />
                                Home
                            </Link>
                        </li>
                        {customItems.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <FaChevronRight className="text-gray-400 mx-2 text-xs" />
                                {item.path ? (
                                    <Link 
                                        to={item.path} 
                                        className="text-[#2D5D4F] hover:text-[#1a3d2e] transition"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-gray-600 font-medium">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </nav>
        );
    }

    // Auto-generate breadcrumbs from URL path
    const pathnames = location.pathname.split('/').filter((x) => x);

    const getBreadcrumbName = (value) => {
        const nameMap = {
            'properties': 'Properties',
            'featured-products': 'Featured Products',
            'blog': 'Blog',
            'contactus': 'Contact Us',
            'about': 'About Us',
        };
        return nameMap[value] || value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <nav className="bg-[#f3e9db] py-3 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <Link 
                            to="/" 
                            className="flex items-center text-[#2D5D4F] hover:text-[#1a3d2e] transition"
                        >
                            <FaHome className="mr-1" />
                            Home
                        </Link>
                    </li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;

                        return (
                            <li key={to} className="flex items-center">
                                <FaChevronRight className="text-gray-400 mx-2 text-xs" />
                                {isLast ? (
                                    <span className="text-gray-600 font-medium">
                                        {getBreadcrumbName(value)}
                                    </span>
                                ) : (
                                    <Link 
                                        to={to} 
                                        className="text-[#2D5D4F] hover:text-[#1a3d2e] transition"
                                    >
                                        {getBreadcrumbName(value)}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
