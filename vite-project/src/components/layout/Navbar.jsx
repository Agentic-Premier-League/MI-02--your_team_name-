import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search candidates, jobs, or skills..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Settings size={20} />
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-700">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'Role'}</p>
          </div>
          <img
            src={user?.avatar || 'https://i.pravatar.cc/150'}
            alt="Profile"
            className="w-9 h-9 rounded-full border border-slate-200 object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
