# GitHub Pages 配置指南

本文档提供了在GitHub上配置和启用GitHub Pages功能的详细步骤，以便成功部署Plant Guard应用。

## 选项1：使用GitHub Actions（推荐）

GitHub Actions提供了自动化构建和部署的最佳方式，无需在本地安装任何依赖。

### 步骤1：将仓库推送到GitHub

1. 在GitHub上创建一个名为`plant-guard-dos`的新仓库
2. 在本地项目目录中执行以下命令：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/[你的用户名]/plant-guard-dos.git
   git push -u origin main
   ```

### 步骤2：配置GitHub Actions

1. 确保`.github/workflows/deploy.yml`文件已存在于项目中（我们已经创建了这个文件）
2. 这个工作流文件会在每次推送到main或master分支时自动运行

### 步骤3：启用GitHub Pages

1. 进入你的GitHub仓库页面
2. 点击顶部导航栏中的"Settings"
3. 在左侧菜单中选择"Pages"
4. 在"Build and deployment"部分：
   - 对于"Source"选项，选择"GitHub Actions"
   - 你会看到一个说明，表明GitHub Actions将自动部署你的站点

### 步骤4：触发部署

1. 推送更改到main分支（如果你刚刚完成了初始推送，这一步可能已经触发了部署）
2. 进入仓库的"Actions"标签页，查看部署工作流的状态
3. 部署完成后，你的站点URL将显示在"Settings > Pages"页面上

## 选项2：使用gh-pages分支

如果你更喜欢手动部署到gh-pages分支，可以按照以下步骤操作：

### 步骤1：安装依赖并构建项目

```bash
# 安装项目依赖
npm install

# 安装gh-pages包
npm install --save-dev gh-pages

# 构建项目
npm run build
```

### 步骤2：部署到gh-pages分支

```bash
# 使用package.json中配置的部署脚本
npm run deploy
```

这将自动创建或更新gh-pages分支，并将构建后的文件推送到该分支。

### 步骤3：配置GitHub Pages

1. 进入你的GitHub仓库页面
2. 点击顶部导航栏中的"Settings"
3. 在左侧菜单中选择"Pages"
4. 在"Build and deployment"部分：
   - 对于"Source"选项，选择"Deploy from a branch"
   - 对于"Branch"选项，选择"gh-pages"和"/(root)"
   - 点击"Save"按钮

## 故障排除

### 常见问题

1. **页面未显示或资源加载失败**
   - 检查vite.config.ts中的base配置是否正确设置为`'/plant-guard-dos/'`
   - 确保所有资源引用使用相对路径
   - 查看浏览器控制台是否有错误信息

2. **GitHub Actions部署失败**
   - 检查Actions日志，查看具体失败原因
   - 确保Node.js版本配置正确
   - 验证package.json中的构建脚本是否正常工作

3. **gh-pages部署问题**
   - 确保你有足够的权限推送分支
   - 检查是否有.gitignore文件阻止了必要文件的提交

## 页面访问

部署成功后，你的站点将可以通过以下URL访问：
```
https://[你的用户名].github.io/plant-guard-dos/
```

首次部署可能需要几分钟时间才能生效。