<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1QMD-J1meghqIHLgvGnRweL4AdECfefFk

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## GitHub Pages 部署指南

### 一键部署（推荐）

我们提供了一个自动化脚本，可以一键完成所有部署步骤：

```bash
./deploy-to-gh-pages.sh
```

该脚本会自动执行以下操作：
- 安装项目依赖
- 安装 gh-pages 包
- 构建项目
- 部署到 GitHub Pages
- 显示部署结果和访问URL

### 手动部署步骤

#### 前置条件
- 安装 Node.js 和 npm
- 克隆此仓库到本地
- Git 仓库已初始化

### 自动部署（推荐）

1. 安装依赖
```bash
npm install
```

2. 安装 gh-pages 包
```bash
npm install --save-dev gh-pages
```

3. 构建项目
```bash
npm run build
```

4. 部署到 GitHub Pages
```bash
npm run deploy
```

### 手动部署选项
如果自动部署失败，可以使用以下手动方法：

1. 构建项目
```bash
npm run build
```

2. 创建或切换到 gh-pages 分支
```bash
git checkout -b gh-pages
```

3. 删除除 dist 文件夹外的所有文件

4. 将 dist 文件夹内容复制到根目录

5. 添加并提交更改
```bash
git add .
git commit -m "Deploy to GitHub Pages"
```

6. 推送 gh-pages 分支
```bash
git push origin gh-pages
```

### 在 GitHub 仓库设置中配置 GitHub Pages

1. 进入您的 GitHub 仓库
2. 导航至 **Settings** → **Pages**
3. 在 **Source** 下，选择：
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)
4. 点击 **Save**

### 部署后配置

- 确保 `vite.config.ts` 中的 `base` 属性设置正确，以匹配仓库名称
- 验证所有资源路径是否为相对路径，以避免 404 错误
- 检查您的应用程序是否正确处理 GitHub Pages URL 结构的路由

### 访问已部署的站点

部署后，您的站点将在此地址可用：
```
https://[your-username].github.io/[your-repository-name]/
```

部署可能需要几分钟时间才能生效。

### 故障排除

- 如果资源加载不正确，请仔细检查 `vite.config.ts` 中的 `base` 配置
- 对于路由问题，考虑使用哈希路由器或更新路由器配置中的基础路径
- 如果站点未显示，请确保 gh-pages 分支已正确推送并包含构建文件
