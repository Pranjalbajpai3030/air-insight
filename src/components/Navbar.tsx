import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, GitCompare, MapPin, Info, Heart, FileSpreadsheet, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: '/', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { to: '/compare', label: 'Compare', icon: <GitCompare className="w-5 h-5" /> },
    { to: '/hotspots', label: 'Hotspots', icon: <MapPin className="w-5 h-5" /> },
    { to: '/sdg', label: 'SDG Tracker', icon: <BarChart3 className="w-5 h-5" /> },
    { to: '/insights', label: 'Insights', icon: <Info className="w-5 h-5" /> },
    { to: '/health', label: 'Health Impact', icon: <Heart className="w-5 h-5" /> },
    { to: '/reports', label: 'Reports', icon: <FileSpreadsheet className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Branding */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AirInsight
              </span>
              <span className="text-xs font-medium bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full">
                India
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50/80 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 hover:text-gray-700 dark:hover:text-gray-200'}
                `}
              >
                {link.icon}
                <span className="ml-2 text-sm font-medium">{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden absolute w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 shadow-xl z-50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center px-3 py-3 rounded-lg transition-colors
                  ${isActive
                    ? 'bg-blue-50/80 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
                `}
              >
                {link.icon}
                <span className="ml-3 font-medium">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;