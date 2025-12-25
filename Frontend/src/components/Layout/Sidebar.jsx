import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiUser, FiActivity } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Projects', path: '/projects', icon: FiFolder },
    { name: 'Profile', path: '/profile', icon: FiUser },
  ];

  return (
    <div className="w-64 bg-white shadow-md min-h-screen border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <FiActivity className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Menu</h2>
            <p className="text-xs text-gray-500">Navigation</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={isActive ? 'text-white mr-3' : 'text-gray-600 group-hover:text-indigo-600 mr-3'} size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>


    </div>
  );
};

export default Sidebar;
