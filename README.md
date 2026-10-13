# 赛博猫咪：小太阳桌面宠物 

> **项目地址：** https://github.com/bsin-ai/Desktop-Pet
> **下载源码：** [Desktop-Pet-main.zip](https://github.com/bsin-ai/Desktop-Pet/archive/refs/heads/main.zip)
>
> 本项目是 macOS 桌面应用，不是网页应用。请下载或克隆后在本地运行；直接打开 `index.html` 或部署到 GitHub Pages 无法使用 Electron 和系统感知功能。

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
* 确保已安装 **Node.js**（建议使用受支持的 LTS 版本）和 **npm**。
* 本项目依赖系统底层 API 抓取应用状态，目前**仅支持 macOS 系统**。运行前需在 macOS 的“系统设置 -> 隐私与安全性 -> 辅助功能”中授予终端或相关应用权限。
* 仓库已包含 `pet.webm` 宠物素材。如需更换，请使用同名透明通道 WebM 视频放置在项目根目录。

### 2. 安装与启动
在终端执行以下命令：

```bash
# 从新账号地址克隆项目
git clone https://github.com/bsin-ai/Desktop-Pet.git
cd Desktop-Pet

# 按锁定版本安装依赖，无需重新初始化 package.json
npm ci

# 启动桌面宠物
npm start
```

如果下载的是 ZIP，请先解压，在解压后的目录打开终端，再执行 `npm ci` 和 `npm start`。

### 3. 配置 AI 互动

启动后点击 ⚙️，输入自己的 DeepSeek API Key 并保存。密钥存储在本机应用的本地存储中，请勿提交到 GitHub 或分享给他人。AI 对话需要网络连接及可用的 API 额度；未配置密钥时仍可体验本地点击互动。

### 4. 分享与旧地址迁移

请使用上方 `bsin-ai/Desktop-Pet` 项目地址分享。已有本地副本的用户可在项目目录中更新远程地址：

```bash
git remote set-url origin https://github.com/bsin-ai/Desktop-Pet.git
```
