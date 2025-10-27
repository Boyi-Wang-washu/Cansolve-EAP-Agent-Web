// 复制到: src/components/chat/ChatMessage.tsx
// 单条聊天消息组件

import { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* AI 头像 */}
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-robot text-white text-sm"></i>
        </div>
      )}

      {/* 消息气泡 */}
      <div className={`flex-1 max-w-md ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div
          className={`p-4 ${
            isUser
              ? 'bg-[#1B8C79] text-white rounded-[18px_18px_4px_18px]'
              : 'bg-[#F3F4F6] text-[#1F2937] rounded-[18px_18px_18px_4px]'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Token 使用信息 */}
        {!isUser && message.token_usage && (
          <div className="text-xs text-gray-500 mt-1 ml-2">
            Token usage: {message.token_usage}
          </div>
        )}
      </div>

      {/* 用户头像 */}
      {isUser && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-white text-sm"></i>
        </div>
      )}
    </div>
  );
}

