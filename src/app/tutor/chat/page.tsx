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
  const initAuth = useAuthStore((state) => state.initAuth);
  const [mounted, setMounted] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // 防止水合错误 + 初始化认证
  useEffect(() => {
    setMounted(true);
    // 确保从 localStorage 恢复用户信息
    initAuth();
    // 延迟检查，给 initAuth 时间完成
    setTimeout(() => {
      setAuthChecked(true);
    }, 100);
  }, [initAuth]);

  // 检查用户登录状态（在 initAuth 完成后）
  useEffect(() => {
    if (mounted && authChecked && !user) {
      router.push('/auth/login');
    }
  }, [mounted, authChecked, user, router]);

  // 加载中状态（等待认证检查完成）
  if (!mounted || !authChecked || !user) {
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
