# 部署架构

> Thunderbolt 自部署解决方案

## 1. 部署方式

| 方式 | 说明 |
|------|------|
| Docker Compose | 快速本地部署 |
| Kubernetes | 生产级部署 |
| Pulumi | 基础设施代码 |

## 2. 自部署组件

| 组件 | 说明 |
|------|------|
| Backend API | Elysia + Bun 后端 |
| PostgreSQL | 数据事实来源 |
| PowerSync | 同步引擎 |
| Keycloak | OIDC 提供商 (可选替换) |
| Resend | 邮件发送 (可选替换) |

## 3. Docker Compose 部署

### 3.1 快速启动

```bash
# 克隆部署配置
git clone https://github.com/thunderbird/thunderbolt-deploy.git
cd thunderbolt-deploy

# 启动所有服务
docker-compose up -d
```

### 3.2 环境变量

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 |
| `POWERSYNC_URL` | PowerSync Cloud URL |
| `KEYCLOAK_URL` | Keycloak URL |
| `RESEND_API_KEY` | Resend API Key |

## 4. Kubernetes 部署

生产级部署使用 Kubernetes，通过 Pulumi 管理基础设施。

## 5. 第三方服务可替换性

| 服务 | 默认 | 可替换？ |
|------|------|----------|
| PowerSync | PowerSync Cloud | 可通过 Docker 自部署 |
| PostgreSQL | 托管 | 否 |
| Keycloak | 默认 OIDC | 是 — 任何 OIDC 兼容 IdP |
| Resend | Resend | 是 — 任何 SMTP |
| PostHog | PostHog Cloud | 可选 |

## 6. 安全部署

### 6.1 COEP/COOP Headers

Web/Enterprise 构建需在 nginx 中设置 COEP/COOP/CORP headers：

```nginx
add_header Cross-Origin-Embedder-Policy "require-corp";
add_header Cross-Origin-Opener-Policy "same-origin";
add_header Cross-Origin-Resource-Policy "cross-origin";
```

### 6.2 自签名证书

本地开发可使用自签名证书。

## 7. 构建产物

| 平台 | 构建命令 |
|------|----------|
| Web | `vite build` |
| Desktop | `bun tauri build` |
| iOS | Tauri → TestFlight |
| Android | Tauri → Play Store Internal Track |
