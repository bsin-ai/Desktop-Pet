# 赛博猫咪：小太阳桌面宠物 

基于 Electron 和 大语言模型 (LLM) 开发的 macOS 桌面级虚拟宠物 AI Agent。该应用通过透明的置顶窗口在桌面上运行，并结合本地系统脚本实时感知用户当前活跃的应用程序，调用 DeepSeek API 提供具有上下文感知能力的暖心互动。

## 🌟 核心功能 (Features)

* **沉浸式桌面交互**：采用无边框、透明背景的 Electron 窗口，层级置顶（Always-on-top），不干扰日常工作。
* **上下文感知 (Context-Awareness)**：利用 macOS 的 AppleScript 定期轮询当前活跃的应用程序（如代码编辑器、学术软件、社交媒体等），并主动触发与当前场景匹配的专属互动对话。
* **多模态互动**：
    * **闲置状态**：定时触发随机的猫咪待机语录。
    * **轻触 (Poke)**：点击宠物触发即时互动气泡。
    * **长按唤醒聊天**：长按宠物区域 0.6 秒进入沉浸式对话模式，支持自然语言输入。
* **本地化密钥管理**：内置隐藏式 UI 面板（点击 ⚙️ 图标），支持直接在客户端内配置并本地存储 DeepSeek API Key。
* **定制化 Persona**：内置系统级 Prompt，严格设定其为“极度治愈、坚信自己是真猫的橘猫”，拒绝 AI 身份认同，输出内容高度精简且符合软萌设定。

## 🛠 技术栈 (Tech Stack)

* **框架**: [Electron](https://www.electronjs.org/) (JavaScript, HTML, CSS)
* **LLM 接口**: [DeepSeek API](https://platform.deepseek.com/) (模型: `deepseek-chat`)
* **系统交互**: AppleScript / `osascript` (用于 macOS 获取前台应用)
* **媒体渲染**: HTML5 `<video>` (WebM 格式透明视频)

## 🚀 环境依赖与运行说明

### 1. 前置准备
* 确保已安装 **Node.js** 和 **npm**。
* 本项目依赖系统底层 API 抓取应用状态，目前**仅支持 macOS 系统**。运行前需在 macOS 的“系统设置 -> 隐私与安全性 -> 辅助功能”中授予终端或相关应用权限。
* 准备一个具有透明通道的宠物动画视频，命名为 `pet.webm`，并放置在项目根目录。

### 2. 安装与启动
克隆本项目到本地后，在项目根目录执行以下命令：

```bash
# 初始化并安装 Electron (如果尚未安装)
npm init -y
npm install electron --save-dev

# 启动项目
npx electron .
