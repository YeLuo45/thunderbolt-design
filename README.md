# Thunderbolt Design 文档站

基于 Thunderbolt 开源项目的 AI 客户端架构设计规范文档。

## 项目结构

```
thunderbolt-design/
├── SPEC.md                      # 设计规范主文档
├── README.md                    # 项目导航
├── docs-site/
│   ├── index.md                # 首页
│   ├── architecture.md         # 架构概览
│   ├── frontend.md             # 前端架构
│   ├── backend.md              # 后端架构
│   ├── sync.md                 # 同步架构
│   ├── deployment.md           # 部署架构
│   ├── .vitepress/
│   │   ├── config.mjs         # VitePress 配置
│   │   ├── theme/
│   │   │   ├── index.js       # 主题入口
│   │   │   └── style.css      # 自定义样式
│   │   └── public/
│   │       └── logo.svg       # Logo
│   └── package.json
└── .github/workflows/
    └── deploy.yml              # GitHub Actions 部署
```

## 文档内容

| 文档 | 说明 |
|------|------|
| `SPEC.md` | 设计规范主文档 |
| `architecture.md` | 系统架构、离线优先、跨平台 |
| `frontend.md` | React 19 + Vite + Zustand + TanStack Query |
| `backend.md` | Elysia + Bun + Drizzle + Better Auth |
| `sync.md` | PowerSync 双路径同步 |
| `deployment.md` | Docker Compose、Kubernetes 部署 |

## 部署

文档站通过 GitHub Actions 自动部署到 GitHub Pages：

- 仓库: https://github.com/YeLuo45/thunderbolt-design
- 文档站: https://yeluo45.github.io/thunderbolt-design/

## 开发

```bash
cd docs-site
pnpm install
pnpm run dev      # 本地预览
pnpm run build    # 构建生产版本
```

## 技术栈

- **文档框架**: VitePress
- **主题**: 自定义暗色主题 (深紫蓝渐变)
- **部署**: GitHub Actions workflow mode
