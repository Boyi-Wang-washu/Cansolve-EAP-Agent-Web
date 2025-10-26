'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const materialCode = searchParams?.get('material');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!materialCode) {
      router.push('/tutor/select-material');
      return;
    }

    // 创建会话
    createSession();
    
    // 添加欢迎消息
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Welcome! I'm your AI English tutor. I'll help you practice discussing the material "${materialCode}". Let's start by talking about what you think are the main ideas in this reading. What caught your attention?`,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [materialCode]);

  const createSession = async () => {
    try {
      const response = await api.post('/sessions', {
        material_id: materialCode,
        mode: '1v1',
      });
      setSessionId(response.data.id);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // 调用 AI API（占位）
      const response = await api.post('/ai/chat', {
        session_id: sessionId,
        message: input,
        history: messages,
      });

      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        role: 'assistant',
        content: response.data.message.content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (confirm('Start a quiz to test your understanding of the material?')) {
      router.push(`/quiz?session=${sessionId}&material=${materialCode}`);
    }
  };

  const handleEndSession = () => {
    if (confirm('Are you sure you want to end this session? A learning report will be generated.')) {
      // TODO: 调用结束会话 API
      router.push('/dashboard');
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <nav className="text-sm text-text-secondary mb-2">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>1v1 Tutoring</span>
          <span className="mx-2">/</span>
          <span>Chat</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">1v1 Tutoring Session</h1>
            <p className="text-text-secondary">Material: {materialCode}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleStartQuiz}
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <i className="fas fa-clipboard-list mr-2"></i>
              Take Quiz
            </button>
            <button
              onClick={handleEndSession}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
            >
              <i className="fas fa-stop mr-2"></i>
              End Session
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-xl shadow-card flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-primary'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-2 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <i className="fas fa-spinner fa-spin mr-2"></i>
                AI is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border-light p-4">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-3">
            <button className="px-3 py-1 text-sm border border-border-light rounded-lg hover:border-primary hover:text-primary transition-colors">
              I agree
            </button>
            <button className="px-3 py-1 text-sm border border-border-light rounded-lg hover:border-primary hover:text-primary transition-colors">
              I disagree
            </button>
            <button className="px-3 py-1 text-sm border border-border-light rounded-lg hover:border-primary hover:text-primary transition-colors">
              I have a question
            </button>
          </div>

          {/* Text Input */}
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              className="flex-1 px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          <i className="fas fa-info-circle mr-2"></i>
          <strong>MVP Note:</strong> AI responses are placeholders. Full AI integration will be implemented in the next phase.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}

