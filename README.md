# AuthVault (v1.0.0)

AuthVault 是一款基于 **Tauri 2.0** 和 **React** 构建的轻量级、高性能桌面端 2FA (双因素认证) 验证器。
旨在提供极简的用户体验、原生级的性能以及跨平台支持。

## ✨ 特性

- **轻量级**: 极小的应用体积和内存占用。
- **安全**: 密钥仅存储在本地，不上传云端。
- **标准的 TOTP 支持**: 兼容 Google Authenticator 等主流验证器算法。
- **多语言支持**: 完美适配 **中文** 和 **英文**。
- **现代化 UI**: 界面简洁美观，支持 **亮色/暗色主题**。
- **实时倒计时**: 精确的 Token 更新倒计时显示。
- **一键复制**: 点击验证码即可自动复制。
- **数据管理**: 支持 JSON 格式的数据 **导入与导出**，方便备份与迁移。
- **自动填充**: 支持识别 `otpauth://` 链接自动填充。

## 🛠️ 技术栈

- **核心架构**: [Tauri 2.0](https://v2.tauri.app/) (Rust + WebView)
- **前端框架**: React 19 + TypeScript + Vite 7
- **样式方案**: TailwindCSS v4
- **国际化**: i18next + react-i18next
- **状态管理**: Zustand (配合持久化存储)
- **核心算法**: `otpauth`

## 🚀 快速开始
... (保持现状) ...
```bash
pnpm tauri build
```

构建产物将位于 `src-tauri/target/release/bundle/` 目录下。

## 📝 开发计划与进度

详情请参阅 [PLAN.md](./PLAN.md)。

- [x] 基础架构搭建
- [x] TOTP 核心逻辑实现
- [x] 账户添加与管理
- [x] 数据持久化
- [x] 亮色/暗色主题适配 (Tailwind v4)
- [x] 搜索与过滤功能
- [x] 数据导入/导出
- [x] 多语言支持 (中/英)
- [x] v1.0.0 正式版发布

## 📄 License

MIT
