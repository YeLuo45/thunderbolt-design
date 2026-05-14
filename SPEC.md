# Thunderbolt Design 文档规范

> Version: 1.0.0
> 基于 thunderbolt v1.0.0 开源项目
> 仓库: YeLuo45/thunderbolt-design

## 1. 项目概述

### 1.1 项目简介

Thunderbolt 是 Mozilla Thunderbird 团队的 AI 客户端产品，支持跨平台（Web、iOS、Android、Mac、Linux、Windows），可自部署，支持本地和云端模型。

### 1.2 核心价值

| 特性 | 说明 |
|------|------|
| 跨平台 | Web、iOS、Android、Mac、Linux、Windows |
| 模型无关 | 支持 Claude、GPT、Mistral、OpenRouter 等 |
| 离线优先 | 本地 SQLite 为数据源 |
| 自部署 | 完整后端栈支持 Docker Compose/Kubernetes |
| E2E 加密 | 可选端到端加密 |

### 1.3 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 19 + Vite + Radix UI |
| 状态管理 | Zustand + TanStack Query + Drizzle |
| 移动端 | Tauri 2 (iOS、Android) |
| 后端 | Elysia + Bun |
| 数据库 | PostgreSQL + SQLite (WA-SQLite) |
| ORM | Drizzle |
| 同步 | PowerSync |
| AI SDK | Vercel AI SDK + MCP Client |
| 认证 | Better Auth (OTP、OIDC、OAuth) |

## 2. 架构概览

### 2.1 系统架构图

```
用户设备 (Tauri Shell)
├── React 前端
│   ├── 状态 & 数据 (Zustand + TanStack Query + Drizzle)
│   ├── AI 聊天 (Vercel AI SDK + MCP Client)
│   └── E2E 加密 (可选)
└── SQLite (离线优先)

服务器基础设施
├── Backend API (Elysia on Bun)
├── Auth (Better Auth)
├── Inference Proxy (速率限制、路由)
├── PowerSync (同步引擎)
└── PostgreSQL
```

### 2.2 核心架构原则

| 原则 | 说明 |
|------|------|
| 离线优先 | 本地 SQLite 为数据源，应用无需网络 |
| 跨平台 | 单一 React 代码库支持所有平台 |
| 模型无关 | LLM 调用通过后端推理代理 |
| 自部署 | 完整服务器栈可自部署 |

## 3. 前端架构

### 3.1 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | UI 框架 |
| Vite | 构建工具 |
| Radix UI | 无样式组件库 |
| Zustand | 状态管理 |
| TanStack Query | 服务端状态 |
| Drizzle | ORM (本地 SQLite) |
| Vercel AI SDK | AI 聊天集成 |

### 3.2 目录结构

```
src/
  ai/              # AI 聊天、MCP Client
  api/             # API 客户端
  chats/           # 聊天相关组件
  components/       # 可复用组件
  contexts/         # React Context
  crypto/           # E2E 加密
  dal/             # Data Access Layer
  db/              # 数据库 (Drizzle)
  defaults/         # 默认配置
  extensions/       # 扩展
  hooks/           # React Hooks
  widgets/         # 组件注册表
```

### 3.3 状态管理

- **Zustand**: 客户端状态
- **TanStack Query**: 服务端状态、缓存
- **Drizzle**: 本地 SQLite ORM

## 4. 后端架构

### 4.1 技术栈

| 技术 | 用途 |
|------|------|
| Elysia | Web 框架 |
| Bun | 运行时 |
| Drizzle | ORM |
| Better Auth | 认证 (OTP、OAuth、OIDC) |
| React Email + Resend | 邮件 |
| OpenTelemetry | 可观测性 |

### 4.2 路由前缀

| 前缀 | 用途 |
|------|------|
| `/api/auth/*` | Better Auth 认证流程 |
| `/v1/account/*` | 账户删除、设备注册 |
| `/v1/powersync/*` | PowerSync 令牌、客户端上传 |
| `/v1/inference/*` | LLM 推理代理 |
| `/v1/pro/*` | 组件数据代理 |
| `/v1/mcp-proxy/*` | MCP 直通 |
| `/v1/posthog/*` | PostHog 分析事件 |

### 4.3 目录结构

```
backend/src/
  api/             # API 路由
  auth/            # 认证
  dal/             # Data Access Layer
  db/              # 数据库
  emails/          # 邮件模板
  inference/       # 推理代理
  middleware/      # 中间件
  pro/             # 组件数据代理
```

## 5. 同步架构

### 5.1 PowerSync 同步

PowerSync 保持用户数据在每个设备上的完整副本。写入先到本地 SQLite，再通过 delta stream 在 SQLite 和后端 PostgreSQL 之间同步。

### 5.2 两条同步路径

| 运行时 | 路径 | 原因 |
|--------|------|------|
| Chrome/Edge/Firefox | SharedWorker + transformers | 跨标签页共享一个连接；在 worker 内运行 E2E 加密 |
| Safari/iOS/Tauri | 主线程 transformer | OPFS+COOP+COEP SharedWorker 不支持；Tauri 阻塞 |

### 5.3 Schema 分裂

- **应用 Schema**: users, accounts, sessions, challenges, envelopes, devices
- **同步 Schema**: shared/powersync-tables.ts 中的表

## 6. E2E 加密

### 6.1 架构

可选 E2E 加密功能，数据在离开设备前加密，服务器只存储密文。

### 6.2 关键层级

- 密钥层级
- 设备批准流程
- 加密列配置

## 7. 部署架构

### 7.1 部署方式

| 方式 | 说明 |
|------|------|
| Docker Compose | 快速本地部署 |
| Kubernetes | 生产级部署 |
| Pulumi | 基础设施代码 |

### 7.2 自部署组件

- Backend API
- PostgreSQL
- PowerSync
- Keycloak (OIDC)
- Resend (邮件)

## 8. 开发工作流

### 8.1 开发命令

```bash
bun install          # 安装依赖
bun run dev          # 开发模式
bun test            # 测试
bun run build       # 构建
```

### 8.2 数据库迁移

```bash
bun db generate      # 生成迁移
bun db migrate      # 运行迁移
```

### 8.3 代码风格

- 使用 `bun` 而非 `npm`
- 使用 `bun test` 而非 `vitest`
- TypeScript: 不用 `any`
- 优先 `type` 而非 `interface`
- 优先箭头函数

## 9. 参考资源

- Thunderbolt 官网: https://thunderbird.net/
- GitHub: https://github.com/thunderbird/thunderbolt
- 架构文档: docs/architecture/README.md
- 开发指南: docs/development/quick-start.md
