// 主聊天界面组件

'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { getChatHistory, clearChatHistory } from '@/lib/chatApi';
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

  // 发送消息（支持流式输出）
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

    // 创建 AI 回复占位符
    const botMessageId = (Date.now() + 1).toString();
    const botMessage: ChatMessageType = {
      id: botMessageId,
      type: 'bot',
      content: '',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, botMessage]);

    try {
      // 流式调用 API（Server-Sent Events）
      const API_URL = 'https://eap-1v1-ai-tutor.onrender.com';
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': userId,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // 读取 Server-Sent Events 流
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.type === 'delta' && data.chunk) {
                  // 增量更新 - 实时显示（打字机效果）
                  fullResponse += data.chunk;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, content: fullResponse }
                        : msg
                    )
                  );
                } else if (data.type === 'complete') {
                  // 完成信号 - 更新 token 使用量
                  if (data.token_usage) {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === botMessageId
                          ? { ...msg, token_usage: data.token_usage }
                          : msg
                      )
                    );
                  }
                } else if (data.error) {
                  // 错误处理
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, content: data.error }
                        : msg
                    )
                  );
                }
              } catch (e) {
                console.error('Parse error:', e);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');

      // 更新占位符为错误消息
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      );
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
      <div className="bg-white border-b border-border-light px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <nav className="text-sm text-text-secondary mb-1">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>1v1 Tutoring</span>
              <span className="mx-2">/</span>
              <span>Chat</span>
            </nav>
            <h1 className="text-xl font-semibold text-text-primary">1v1 Tutoring Chat</h1>
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
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-bg-light">
        {/* 欢迎消息 */}
        {messages.length === 0 && !isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div className="bg-gray-100 text-text-primary rounded-[18px_18px_18px_4px] max-w-md p-4">
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
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div className="bg-gray-100 rounded-[18px_18px_18px_4px] p-4">
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

