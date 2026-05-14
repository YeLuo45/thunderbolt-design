import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Thunderbolt Design",
  description: "Thunderbolt AI 客户端架构设计规范文档站",
  lang: "zh-CN",
  base: "/thunderbolt-design/",

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
  ],

  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "架构概览", link: "/architecture" },
      { text: "前端架构", link: "/frontend" },
      { text: "后端架构", link: "/backend" },
      { text: "同步架构", link: "/sync" },
    ],

    sidebar: [
      {
        text: "文档",
        items: [
          { text: "首页", link: "/" },
          { text: "架构概览", link: "/architecture" },
          { text: "前端架构", link: "/frontend" },
          { text: "后端架构", link: "/backend" },
          { text: "同步架构", link: "/sync" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/thunderbird/thunderbolt" },
    ],

    footer: {
      message: "基于 Thunderbolt 开源项目构建",
      copyright: "Copyright © 2024-present Thunderbolt Contributors",
    },
  },
});
