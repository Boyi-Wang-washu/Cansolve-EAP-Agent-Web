'use client';

import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/lib/types';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <nav className="text-sm text-text-secondary mb-2">
          <span>Home</span>
        </nav>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-text-secondary">
          {user?.role === UserRole.STUDENT && 'Ready to practice your English today?'}
          {user?.role === UserRole.TEACHER && 'Manage your materials and track student progress'}
          {user?.role === UserRole.ADMIN && 'System overview and management'}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {user?.role === UserRole.STUDENT && (
          <>
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Today's Study Time</h3>
                <i className="fas fa-clock text-primary text-xl"></i>
              </div>
              <p className="text-3xl font-bold text-text-primary">0 min</p>
              <p className="text-xs text-text-secondary mt-2">Target: 30 min</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Sessions</h3>
                <i className="fas fa-comments text-primary text-xl"></i>
              </div>
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-xs text-text-secondary mt-2">All time</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Streak Days</h3>
                <i className="fas fa-fire text-primary text-xl"></i>
              </div>
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-xs text-text-secondary mt-2">Keep it up!</p>
            </div>
          </>
        )}

        {user?.role === UserRole.TEACHER && (
          <>
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Materials</h3>
                <i className="fas fa-book text-primary text-xl"></i>
              </div>
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-xs text-text-secondary mt-2">Uploaded</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Active Students</h3>
                <i className="fas fa-users text-primary text-xl"></i>
              </div>
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-xs text-text-secondary mt-2">This week</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Reports Generated</h3>
                <i className="fas fa-chart-line text-primary text-xl"></i>
              </div>
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-xs text-text-secondary mt-2">Last 7 days</p>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.role === UserRole.STUDENT && (
            <>
              <a 
                href="/tutor/select-material" 
                className="flex items-center space-x-4 p-4 border border-border-light rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-comments text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">Start 1v1 Tutoring</h3>
                  <p className="text-sm text-text-secondary">Practice with AI tutor</p>
                </div>
              </a>
              
              <a 
                href="/reports" 
                className="flex items-center space-x-4 p-4 border border-border-light rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-secondary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">View My Reports</h3>
                  <p className="text-sm text-text-secondary">Check your progress</p>
                </div>
              </a>
            </>
          )}

          {user?.role === UserRole.TEACHER && (
            <>
              <a 
                href="/teacher/materials/upload" 
                className="flex items-center space-x-4 p-4 border border-border-light rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-upload text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">Upload Material</h3>
                  <p className="text-sm text-text-secondary">Add new reading materials</p>
                </div>
              </a>
              
              <a 
                href="/teacher/students" 
                className="flex items-center space-x-4 p-4 border border-border-light rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-secondary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">View Students</h3>
                  <p className="text-sm text-text-secondary">Check student progress</p>
                </div>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <i className="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">MVP Version</h4>
            <p className="text-sm text-blue-700">
              This is a minimum viable product. AI features and advanced functionalities will be integrated in the next phase.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

