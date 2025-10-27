// 复制到: src/components/chat/ChatInterface.tsx
// 主聊天界面组件

'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { sendChatMessage, getChatHistory, clearChatHistory } from '@/lib/chatApi';
import { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatInterfaceProps {
  userId: string;
}

export function ChatInterface({ userId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 加载聊天历史
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await getChatHistory(userId);
        if (response.success) {
          setMessages(response.messages);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
        setError('Failed to load chat history');
      }
    };

    if (userId) {
      loadHistory();
    }
  }, [userId]);

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const handleSend = async (message: string) => {
    if (!userId) {
      setError('User not logged in');
      return;
    }

    setError(null);
    setIsLoading(true);

    // 添加用户消息
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // 调用 API
      const response = await sendChatMessage(message, userId);

      // 添加 AI 回复
      const botMessage: ChatMessageType = {
        id: response.message_id,
        type: 'bot',
        content: response.response,
        timestamp: new Date().toISOString(),
        token_usage: response.token_usage,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');

      // 添加错误消息
      const errorMessage: ChatMessageType = {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 清除历史
  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear chat history?')) {
      return;
    }

    try {
      await clearChatHistory(userId);
      setMessages([]);
      setError(null);
    } catch (err) {
      console.error('Failed to clear history:', err);
      setError('Failed to clear history');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      {/* 页面标题栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <nav className="text-sm text-gray-500 mb-1">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>1v1 Tutoring</span>
              <span className="mx-2">/</span>
              <span>Chat</span>
            </nav>
            <h1 className="text-xl font-semibold text-gray-800">1v1 Tutoring Chat</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <i className="fas fa-trash mr-2"></i>
              Clear History
            </button>
          </div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          {error}
        </div>
      )}

      {/* 聊天消息区域 */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
        {/* 欢迎消息 */}
        {messages.length === 0 && !isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[#1B8C79] rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div className="bg-[#F3F4F6] text-[#1F2937] rounded-[18px_18px_18px_4px] max-w-md p-4">
              <p className="text-sm">
                Welcome to your 1v1 tutoring session! I'm here to help you with English learning.
                How can I assist you today?
              </p>
            </div>
          </div>
        )}

        {/* 消息列表 */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* 加载指示器 */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[#1B8C79] rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div className="bg-[#F3F4F6] rounded-[18px_18px_18px_4px] p-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

