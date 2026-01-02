# AuthVault 开发计划

## 1. 项目概述
**AuthVault** 是一款基于 **Tauri 2.0** 和 **React** 构建的轻量级桌面端 2FA (双因素认证) 验证器。
目标是提供极小的应用体积、原生级的性能以及跨平台支持（Windows/macOS/Linux/Mobile）。

## 2. 技术栈
*   **核心架构**: [Tauri 2.0](https://v2.tauri.app/) (Rust + WebView)
*   **前端框架**: React 18 + TypeScript + Vite
*   **样式方案**: TailwindCSS (Utility-first CSS)
*   **图标库**: Lucide React
*   **状态管理**: Zustand (极简状态管理)
*   **核心逻辑**: `otpauth` (TOTP 算法实现)
*   **路由**: React Router DOM (为未来多页面做准备)
*   **包管理器**: pnpm

## 3. 功能模块 Roadmap

### 阶段一：基础架构与环境
- [x] 初始化 Tauri 2.0 + React + TypeScript 项目
- [x] 配置 TailwindCSS
- [x] 配置 Git 环境与自动提交规范
- [x] 搭建基础 UI 骨架 (侧边栏/顶部栏/内容区)

### 阶段二：核心业务逻辑
- [x] **数据模型定义**: 定义 Account 接口 (Issuer, AccountName, Secret, Type)
- [x] **TOTP 引擎**: 封装 `otpauth`，实现基于 Secret 生成 6位 Code 的 Hook
- [x] **时间同步**: 处理本地时间偏差 (UI 显示倒计时进度条)

### 阶段三：账户管理功能
- [x] **添加账户页面**: 表单输入 (发行方、账户名、密钥)
- [x] **账户列表展示**: 卡片式布局，显示当前 Code 和倒计时
- [x] **复制功能**: 点击 Code 自动复制到剪贴板
- [x] **持久化存储**: 使用 `localStorage` 或 Tauri Store 插件保存账户数据 (已通过 Zustand persist 实现)

### 阶段四：功能完善与优化
- [x] **编辑与删除**: 支持删除账户
- [x] **搜索/过滤**: 快速查找账户
- [x] **UI/UX 优化**:
    - [x] **主题适配**: 支持亮色/暗色主题，并自动检测系统设置
- [ ] **导入导出**: 支持导出数据备份或从二维码/URI 导入
- [ ] **生产环境构建**: 编译 Windows `exe` / `msi`

## 4. 开发规范
*   **Git 提交**: 每次完成一个独立功能或修复 bug 后提交。
*   **注释**: 关键逻辑必须包含中文注释。
*   **代码风格**: 遵循 ESLint + Prettier 默认配置。
