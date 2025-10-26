'use client';

import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border-light h-16 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-graduation-cap text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">BNBU EAP</h1>
            <p className="text-xs text-text-secondary">English Teaching Assistant</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search materials, sessions..." 
              className="w-full pl-10 pr-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"></i>
          </div>
        </div>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-text-secondary hover:text-primary transition-colors">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-sm font-medium text-text-primary">
                {user?.name || 'User'}
              </span>
              <i className="fas fa-chevron-down text-xs text-text-secondary"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

