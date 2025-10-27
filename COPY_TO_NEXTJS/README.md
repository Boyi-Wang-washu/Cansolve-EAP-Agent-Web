# 📦 复制到 Next.js 的文件包

## 🎯 使用说明

将此文件夹中的所有文件复制到你的 Next.js 项目对应位置。

---

## 📁 文件映射表

| 源文件 | 复制到 Next.js 项目的位置 |
|--------|-------------------------|
| `1-chatApi.ts` | `src/lib/chatApi.ts` |
| `2-chat-types.ts` | `src/types/chat.ts` |
| `3-ChatMessage.tsx` | `src/components/chat/ChatMessage.tsx` |
| `4-ChatInput.tsx` | `src/components/chat/ChatInput.tsx` |
| `5-ChatInterface.tsx` | `src/components/chat/ChatInterface.tsx` |
| `6-page.tsx` | `src/app/tutor/chat/page.tsx` |
| `env.local.example` | `.env.local` (复制内容到这个文件) |

---

## 🚀 复制步骤

### 1. 创建必要的文件夹

在你的 Next.js 项目中：
```bash
# 如果不存在，创建这些文件夹
mkdir -p src/components/chat
```

### 2. 逐个复制文件

按照上面的映射表，复制每个文件到对应位置。

### 3. 配置环境变量

复制 `env.local.example` 的内容到项目根目录的 `.env.local`

---

## ✅ 完成后检查

- [ ] 6 个 TypeScript 文件已复制
- [ ] 环境变量已配置
- [ ] 没有 import 错误
- [ ] Flask API 在 localhost:5000 运行
- [ ] Next.js 启动成功

---

## 🆘 遇到问题？

### Import 错误
确保你的项目中有：
- `@/store/authStore`
- `@/components/layout/DashboardLayout`

如果路径不同，需要调整 import 语句。

### API 连接失败
1. 确保 Flask 在运行: `python app.py`
2. 检查 `.env.local` 中的 URL 是否正确
3. 重启 Next.js 开发服务器

---

**准备好了就开始复制吧！** 🎉

