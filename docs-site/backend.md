# 后端架构

> Thunderbolt Elysia + Bun 后端服务

## 1. 技术栈

| 技术 | 用途 |
|------|------|
| Elysia | Web 框架 (typed end-to-end, OpenAPI spec) |
| Bun | 运行时 (毫秒级启动) |
| Drizzle | ORM (schema-first) |
| Better Auth | 认证 (OTP、OAuth、OIDC) |
| React Email + Resend | 邮件模板 |
| OpenTelemetry | 可观测性 (可选) |

## 2. 目录结构

```
backend/src/
  api/             # API 路由
  auth/            # 认证 (Better Auth)
  dal/             # Data Access Layer
  db/              # 数据库配置
  emails/          # React Email 邮件模板
  errors/          # 错误处理
  inference/       # LLM 推理代理
  middleware/      # 中间件
  pro/             # 组件数据代理
  posthog/         # PostHog 分析事件
  mcp-proxy/       # MCP 直通
```

## 3. 路由前缀

| 前缀 | 用途 |
|------|------|
| `/api/auth/*` | Better Auth 认证流程 (OAuth、OIDC、magic-link、session) |
| `/v1/account/*` | 账户删除、设备注册、envelopes |
| `/v1/powersync/*` | PowerSync 令牌发放、客户端上传 |
| `/v1/inference/*` | LLM 推理调用 (速率限制、提供商无关) |
| `/v1/pro/*` | 组件数据获取代理 (链接预览等) |
| `/v1/mcp-proxy/*` | MCP 直通 |
| `/v1/posthog/*` | PostHog 分析事件中继 |
| `/v1/swagger` | OpenAPI 规范 (当 `SWAGGER_ENABLED=true`) |

## 4. 认证架构

### 4.1 Better Auth

Better Auth 支持多种认证方式：

| 方式 | 说明 |
|------|------|
| Magic-link (OTP) | 邮箱验证码登录 |
| Google OAuth | Google 账号登录 |
| Microsoft OAuth | Microsoft 账号登录 |
| OIDC | 通用 OIDC 提供商 |

### 4.2 设备注册

Challenge tokens 用于设备注册和授权。

## 5. 数据库

### 5.1 Drizzle ORM

Schema-first 模式，迁移通过 `bun db generate` 生成：

```bash
bun db generate      # 生成迁移
bun db migrate      # 运行迁移
```

### 5.2 Schema 分裂

- **应用 Schema**: users, accounts, sessions, challenges, envelopes, devices
- **同步 Schema**: shared/powersync-tables.ts 中的表

### 5.3 开发时数据库

本地开发和测试可使用 PGLite (浏览器/Node 内嵌 Postgres)：

```bash
bun run db:dev
```

## 6. 推理代理

### 6.1 架构

推理代理提供：
- 统一的 LLM API 接口
- 速率限制
- 提供商路由

### 6.2 支持的提供商

| 提供商 | 说明 |
|--------|------|
| Anthropic | Claude 系列 |
| OpenAI | GPT 系列 |
| Mistral | Mistral 系列 |
| OpenRouter | 聚合多个提供商 |
| 任何 OpenAI 兼容端点 | 自定义部署 |

## 7. 邮件系统

### 7.1 React Email

邮件模板在 `backend/src/emails/` 作为 React 组件编写：

```typescript
import { Html, Button } from '@react-email/components';

export function MagicLinkEmail({ url }: { url: string }) {
  return (
    <Html>
      <Button href={url}>登录 Thunderbolt</Button>
    </Html>
  );
}
```

### 7.2 Resend

邮件通过 Resend 发送。

## 8. 中间件

### 8.1 错误处理

错误处理中间件在高层统一处理错误，而非在每个 handler 中 try/catch。

### 8.2 CORS 配置

添加自定义 header（如 `X-Device-ID`）时需更新 `backend/src/config/settings.ts` 的 `corsAllowHeaders`。

## 9. OpenAPI 文档

当 `SWAGGER_ENABLED=true` 时，Elysia 自动发布 OpenAPI 规范到 `/v1/swagger`。

## 10. 开发命令

```bash
bun run dev              # 开发模式
bun run build           # 构建
bun test                # 测试
bun db generate         # 生成迁移
bun db migrate          # 运行迁移
```
