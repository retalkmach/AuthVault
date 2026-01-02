# AuthVault

AuthVault 是一款基于 **Tauri 2.0** 和 **React** 构建的轻量级、高性能桌面端 2FA (双因素认证) 验证器。
旨在提供极简的用户体验、原生级的性能以及跨平台支持。

## ✨ 特性

- **轻量级**: 极小的应用体积和内存占用。
- **安全**: 密钥仅存储在本地，不上传云端。
- **标准的 TOTP 支持**: 兼容 Google Authenticator 等主流验证器算法。
- **现代化 UI**: 界面简洁美观，支持 **亮色/暗色主题** 自动切换。
- **实时倒计时**: 精确的 Token 更新倒计时显示。
- **一键复制**: 点击验证码即可自动复制。
- **导入方便**: 支持识别 `otpauth://` 链接自动填充。

## 🛠️ 技术栈

- **核心架构**: [Tauri 2.0](https://v2.tauri.app/) (Rust + WebView)
- **前端框架**: React 18 + TypeScript + Vite
- **样式方案**: TailwindCSS v4
- **图标库**: Lucide React
- **状态管理**: Zustand (配合持久化存储)
- **核心算法**: `otpauth`

## 🚀 快速开始

### 环境要求

确保你已经安装了以下环境：

- [Node.js](https://nodejs.org/) (推荐 LTS)
- [pnpm](https://pnpm.io/)
- [Rust](https://www.rust-lang.org/tools/install) (Tauri 开发依赖)
- Windows: "C++ 生成工具" 和 Windows SDK (通过 Visual Studio Installer 安装)

### 安装依赖

```bash
pnpm install
```

### 开发模式运行

同时启动前端热更新和 Tauri 窗口：

```bash
pnpm tauri dev
```

或者仅运行前端在浏览器中查看（无 Tauri API 支持）：

```bash
pnpm dev
```

### 构建生产版本

构建用于生产环境的应用程序（如 Windows .exe）：

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
- [x] 亮色/暗色主题适配
- [ ] 搜索与过滤功能
- [ ] 数据导入/导出

## 📄 License

MIT
