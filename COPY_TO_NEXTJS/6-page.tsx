// 复制到: src/app/tutor/chat/page.tsx
// 聊天页面 - 替换你现有的 tutor/chat 页面

'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  // 防止水合错误
  useEffect(() => {
    setMounted(true);
  }, []);

  // 检查用户登录状态
  useEffect(() => {
    if (mounted && !user) {
      router.push('/auth/login');
    }
  }, [mounted, user, router]);

  // 加载中状态
  if (!mounted || !user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-[#1B8C79] mb-4"></i>
            <p className="text-gray-600">Loading...</p>
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

