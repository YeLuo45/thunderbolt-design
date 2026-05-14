# 前端架构

> Thunderbolt React + Vite 前端应用

## 1. 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | UI 框架 |
| Vite | 构建工具 |
| Radix UI | 无样式组件库 |
| Zustand | 状态管理 |
| TanStack Query | 服务端状态、缓存 |
| Drizzle | ORM (本地 SQLite) |
| Vercel AI SDK | AI 聊天集成 |
| TypeScript | 类型系统 |

## 2. 目录结构

```
src/
  ai/              # AI 聊天、MCP Client
  api/             # API 客户端
  chats/           # 聊天相关组件
  components/       # 可复用组件
  content-view/    # 内容视图
  contexts/         # React Context
  crypto/           # E2E 加密
  dal/             # Data Access Layer
  db/              # 数据库 (Drizzle)
  defaults/         # 默认配置
  extensions/       # 扩展
  hooks/           # React Hooks
  widgets/         # 组件注册表
  index.tsx        # 入口点
  index.css        # 全局样式
```

## 3. 状态管理

### 3.1 Zustand

Zustand 用于客户端状态管理：

```typescript
import { create } from 'zustand';

export const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### 3.2 TanStack Query

TanStack Query 用于服务端状态、缓存和同步：

```typescript
import { useQuery } from '@tanstack/react-query';

export function useChats() {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => api.getChats(),
  });
}
```

### 3.3 Drizzle ORM

Drizzle 是本地 SQLite 的 ORM：

```typescript
import { drizzle } from 'drizzle-orm/wa-sqlite';
import { chats } from './schema';

const db = drizzle(sqlite);
const userChats = await db.select().from(chats);
```

## 4. AI 集成

### 4.1 Vercel AI SDK

Vercel AI SDK 提供 AI 聊天界面：

```typescript
import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    // ...
  );
}
```

### 4.2 MCP Client

MCP (Model Context Protocol) Client 用于工具调用和上下文管理。

## 5. E2E 加密

### 5.1 架构

可选 E2E 加密功能：
- 数据在离开设备前加密
- 服务器只存储密文
- 密钥层级保护

### 5.2 加密列

配置加密列，数据在客户端加密后上传。

## 6. Widget 系统

### 6.1 Widget 注册表

Assistant 响应可嵌入富交互组件（天气、链接预览、股票图表等）：

```typescript
// src/widgets/registry.ts
export const widgetRegistry = {
  weather: WeatherWidget,
  stock: StockWidget,
};
```

### 6.2 Widget 渲染

XML 标签由解析器提取为 `<WidgetRenderer />` 调用。

## 7. WebView 侧边栏

在桌面和移动端（非 Web），链接预览和第三方内容在嵌入式 Tauri WebView 中打开，而非系统浏览器。

## 8. 开发原则

### 8.1 React 模式

- 使用 `useReducer` 当组件需要 3+ 个 `useState`
- 抽象状态/逻辑到 `use[Component]State()` hooks
- **慎用 `useEffect`**，优先使用 `useMemo`、`useSyncExternalStore`、`useTransition`

### 8.2 代码风格

- TypeScript 不用 `any`
- 优先 `type` 而非 `interface`
- 优先箭头函数
- 优先 `const` 而非 `let`
- 优先 early return

## 9. 测试

```bash
bun test                    # 运行所有测试
bun test src/app.test.ts   # 运行特定测试
```

测试文件命名为 `<file>.test.ts`。

## 10. 构建和发布

```bash
bun run build               # 构建生产版本
bun tauri build            # 构建 Tauri 应用
```
