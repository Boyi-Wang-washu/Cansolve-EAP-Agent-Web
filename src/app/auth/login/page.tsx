'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserRole, User } from '@/lib/types';
import Script from 'next/script';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 模拟用户数据库
  const mockUsers = {
    'student001': {
      id: 's001',
      name: 'Boyi Wang',
      email: 'boyi.wang@student.bnbu.edu',
      role: UserRole.STUDENT,
      class_id: 'EAP-2024-A',
      password: 'student123',
    },
    'teacher001': {
      id: 't001',
      name: 'Prof. John Smith',
      email: 'john.smith@teacher.bnbu.edu',
      role: UserRole.TEACHER,
      password: 'teacher123',
    },
    'admin': {
      id: 'a001',
      name: 'System Admin',
      email: 'admin@bnbu.edu',
      role: UserRole.ADMIN,
      password: 'admin123',
    },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 验证用户
    const user = mockUsers[username as keyof typeof mockUsers];
    
    if (!user || user.password !== password) {
      setError('Invalid username or password');
      setLoading(false);
      return;
    }

    // 生成模拟 token
    const token = `mock_token_${user.id}_${Date.now()}`;
    
    // 设置认证信息
    const { password: _, ...userData } = user;
    console.log('Calling setAuth with:', userData);
    setAuth(userData as User, token);
    
    // 验证是否保存成功 - 调试当前域名
    setTimeout(() => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      console.log('Current URL:', window.location.href);
      console.log('LocalStorage keys:', Object.keys(localStorage));
      console.log('Saved to localStorage:', { savedUser, savedToken });
    }, 100);
    
    // 根据角色跳转
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <>
      <Script 
        src="https://unpkg.byted-static.com/fortawesome/fontawesome-free/6.7.2/js/all.min.js" 
        data-auto-replace-svg="nest"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card-hover p-8 w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
              <i className="fas fa-graduation-cap text-white text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">BNBU EAP</h1>
            <p className="text-sm text-text-secondary">English Teaching Assistant</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-border-light">
            <p className="text-xs text-text-secondary text-center mb-3">
              Demo Accounts (MVP Only)
            </p>
            <div className="space-y-2 text-xs text-text-secondary">
              <div className="bg-bg-light p-2 rounded">
                <strong>Student:</strong> student001 / student123
              </div>
              <div className="bg-bg-light p-2 rounded">
                <strong>Teacher:</strong> teacher001 / teacher123
              </div>
              <div className="bg-bg-light p-2 rounded">
                <strong>Admin:</strong> admin / admin123
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

