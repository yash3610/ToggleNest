import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import Notifications from '../Notifications/Notifications';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-indigo-600">ToggleNest</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Notifications />
            
            <Link to="/profile" className="flex items-center space-x-3 border-l border-gray-200 pl-4 hover:opacity-80 transition-smooth">
              <div className="hidden sm:block text-right">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs font-medium text-green-600">
                  {user.role}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                <FiUser size={18} />
              </div>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-smooth"
            >
              <FiLogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
