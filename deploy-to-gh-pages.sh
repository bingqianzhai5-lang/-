#!/bin/bash

# Plant Guard DOS - GitHub Pages 一键部署脚本
# 此脚本将自动完成以下操作：
# 1. 安装依赖
# 2. 安装 gh-pages 包
# 3. 构建项目
# 4. 部署到 GitHub Pages

echo "===================================="
echo "Plant Guard DOS - GitHub Pages 部署脚本"
echo "===================================="

# 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
    echo "错误: 未找到 Node.js。请先安装 Node.js 和 npm。"
    exit 1
fi

echo "正在安装项目依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "错误: 依赖安装失败！"
    exit 1
fi

echo "正在安装 gh-pages 包..."
npm install --save-dev gh-pages
if [ $? -ne 0 ]; then
    echo "错误: gh-pages 安装失败！"
    exit 1
fi

echo "正在构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "错误: 项目构建失败！"
    exit 1
fi

echo "正在部署到 GitHub Pages..."
npx gh-pages -d dist
if [ $? -ne 0 ]; then
    echo "错误: 部署失败！"
    echo "请检查以下事项："
    echo "1. Git 仓库已正确配置"
    echo "2. 您有权限推送代码到远程仓库"
    echo "3. 网络连接正常"
    exit 1
fi

echo "===================================="
echo "✅ 部署成功！"
echo "您的网站将很快在以下地址可用："
echo "https://bingqianzhai5-lang.github.io/plant-guard-dos/"
echo "===================================="
echo "注意：部署可能需要几分钟时间才能在 GitHub 上完全生效。"
echo "请在浏览器中访问上述 URL 验证部署结果。"
echo "如果遇到问题，请检查："
echo "1. GitHub 仓库的 Pages 设置是否正确"
echo "2. vite.config.ts 中的 base 配置是否设置为 '/plant-guard-dos/'"