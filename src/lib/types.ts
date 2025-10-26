// 用户角色
export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

// 用户类型
export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  class_id?: string;
  avatar?: string;
  created_at: string;
}

// 会话模式
export enum SessionMode {
  ONE_ON_ONE = '1v1',
  GROUP = 'group',
  VIDEO = 'video',
}

// 会话状态
export enum SessionStatus {
  IN_PROGRESS = 'in_progress',
  ENDED = 'ended',
  FAILED = 'failed',
}

// 材料类型
export interface Material {
  id: string;
  code: string; // 唯一索引码
  title: string;
  description?: string;
  storage_url: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
  version: number;
  tags?: string[];
  char_count?: number;
}

// 会话类型
export interface Session {
  id: string;
  user_id: string;
  material_id: string;
  mode: SessionMode;
  started_at: string;
  ended_at?: string;
  status: SessionStatus;
}

// 消息类型
export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  tokens?: number;
}

// 学习报告类型（简化版）
export interface LearningReport {
  id: string;
  user_id: string;
  session_id: string;
  material_id: string;
  rubric_json: Record<string, any>; // 详细评分数据
  md_summary: string; // Markdown 格式摘要
  created_at: string;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

