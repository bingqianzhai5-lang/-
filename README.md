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

### 前置条件
- 安装 Node.js 和 npm
- 克隆此仓库到本地

### 部署步骤

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

7. 在 GitHub 仓库设置中，将 GitHub Pages 源设置为 gh-pages 分支
