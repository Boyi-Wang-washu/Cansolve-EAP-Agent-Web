// 1v1 Tutoring Chat 页面

'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);  // ← 使用 isLoading
  const initAuth = useAuthStore((state) => state.initAuth);
  const [mounted, setMounted] = useState(false);

  // 防止水合错误 + 初始化认证
  useEffect(() => {
    setMounted(true);
    // 确保从 localStorage 恢复用户信息
    initAuth();
  }, [initAuth]);

  // 添加调试日志
  useEffect(() => {
    console.log('User from authStore:', user);
    console.log('User ID:', user?.id);
    console.log('isLoading:', isLoading);
  }, [user, isLoading]);

  // 检查用户登录状态（等待 isLoading 完成）
  useEffect(() => {
    // 只有在加载完成后才检查
    if (!isLoading && !user) {
      console.log('No user found, redirecting to login');
      router.push('/auth/login');
    }
  }, [isLoading, user, router]);

  // 加载中状态（等待认证检查完成）
  if (!mounted || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
            <p className="text-text-secondary">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ChatInterface userId={user.id} />
    </DashboardLayout>
  );
}
