// API 调用封装 - 与 Flask 后端通信

const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:5000';

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  token_usage?: number;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  token_usage: number;
  message_id: string;
}

export interface HistoryResponse {
  success: boolean;
  messages: ChatMessage[];
}

/**
 * 发送聊天消息
 * @param message 用户消息
 * @param userId 用户 ID（从 authStore 获取）
 */
export async function sendChatMessage(
  message: string,
  userId: string
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': userId, // 传递用户 ID
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send message');
  }

  return response.json();
}

/**
 * 获取聊天历史
 * @param userId 用户 ID
 */
export async function getChatHistory(userId: string): Promise<HistoryResponse> {
  const response = await fetch(`${API_BASE_URL}/api/history`, {
    method: 'GET',
    headers: {
      'X-User-ID': userId,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get history');
  }

  return response.json();
}

/**
 * 清除聊天历史
 * @param userId 用户 ID
 */
export async function clearChatHistory(userId: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/api/clear`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': userId,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to clear history');
  }

  return response.json();
}

/**
 * 健康检查
 */
export async function checkApiHealth(): Promise<{ status: string; message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  return response.json();
}

