---
layout: home

hero:
  name: "Thunderbolt Design"
  text: "Mozilla AI 客户端架构设计"
  tagline: "基于 Thunderbolt 开源项目构建的设计规范文档站"
  image:
    src: /logo.svg
    alt: Thunderbolt Logo
  actions:
    - theme: brand
      text: 架构概览
      link: /architecture
    - theme: brand
      text: 前端架构
      link: /frontend

features:
  - icon: 🏗️
    title: 系统架构
    details: 离线优先、跨平台、模型无关、自部署的 AI 客户端
    link: /architecture
    linkText: 查看文档
  - icon: ⚛️
    title: 前端架构
    details: React 19 + Vite + Radix UI + Zustand + TanStack Query
    link: /frontend
    linkText: 查看文档
  - icon: 🔧
    title: 后端架构
    details: Elysia + Bun + Drizzle + Better Auth + PowerSync
    link: /backend
    linkText: 查看文档
  - icon: 🔄
    title: 同步架构
    details: PowerSync 离线同步、双路径 (SharedWorker + 主线程)
    link: /sync
    linkText: 查看文档
  - icon: 🔐
    title: E2E 加密
    details: 可选端到端加密、密钥层级、设备批准流程
    link: /architecture
    linkText: 查看文档
  - icon: 🚢
    title: 部署架构
    details: Docker Compose、Kubernetes、Pulumi 支持
    link: /architecture
    linkText: 查看文档

---

## Thunderbolt 核心功能

Thunderbolt 是 Mozilla Thunderbird 团队的 AI 客户端产品：

- **跨平台**: Web、iOS、Android、Mac、Linux、Windows
- **模型无关**: 支持 Claude、GPT、Mistral、OpenRouter 等
- **离线优先**: 本地 SQLite 为数据源
- **自部署**: 完整后端栈支持 Docker Compose/Kubernetes
- **E2E 加密**: 可选端到端加密

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 19 + Vite + Radix UI |
| 后端 | Elysia + Bun |
| 数据库 | PostgreSQL + SQLite |
| ORM | Drizzle |
| 同步 | PowerSync |
| 认证 | Better Auth |
