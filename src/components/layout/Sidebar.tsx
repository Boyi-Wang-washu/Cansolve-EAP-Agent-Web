'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/lib/types';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-border-light sidebar-transition z-40">
      <nav className="p-4 space-y-2">
        {/* Dashboard */}
        <Link 
          href="/dashboard" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            isActive('/dashboard') 
              ? 'nav-item-active' 
              : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
          }`}
        >
          <i className="fas fa-home w-5"></i>
          <span>Dashboard</span>
        </Link>
        
        {/* Student Menu */}
        {user?.role === UserRole.STUDENT && (
          <div className="mt-4 pt-4 border-t border-border-light">
            <h3 className="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Learning
            </h3>
            <Link 
              href="/tutor/chat" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname?.startsWith('/tutor/chat')
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-comments w-5"></i>
              <span>1v1 Tutoring</span>
            </Link>
            <Link 
              href="/reports" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/reports') 
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-chart-line w-5"></i>
              <span>My Reports</span>
            </Link>
          </div>
        )}
        
        {/* Teacher Menu */}
        {user?.role === UserRole.TEACHER && (
          <div className="mt-4 pt-4 border-t border-border-light">
            <h3 className="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Teaching
            </h3>
            <Link 
              href="/teacher/materials" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/teacher/materials') 
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-book w-5"></i>
              <span>Materials</span>
            </Link>
            <Link 
              href="/teacher/students" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/teacher/students') 
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-users w-5"></i>
              <span>Students</span>
            </Link>
            <Link 
              href="/teacher/reports" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/teacher/reports') 
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-file-alt w-5"></i>
              <span>Student Reports</span>
            </Link>
          </div>
        )}
        
        {/* Admin Menu */}
        {user?.role === UserRole.ADMIN && (
          <div className="mt-4 pt-4 border-t border-border-light">
            <h3 className="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Admin Tools
            </h3>
            <Link 
              href="/admin/users" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/admin/users') 
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-users-cog w-5"></i>
              <span>User Management</span>
            </Link>
            <Link 
              href="/admin/config" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/admin/config') 
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-cogs w-5"></i>
              <span>System Config</span>
            </Link>
            <Link 
              href="/admin/audit" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive('/admin/audit') 
                  ? 'nav-item-active' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <i className="fas fa-file-alt w-5"></i>
              <span>Data Audit</span>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}

