// 添加类型声明以避免TypeScript错误
declare module 'vite';
declare module '@vitejs/plugin-react';

// 使用动态导入来避免直接依赖检查
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  base: '/plant-guard-dos/', // 设置为GitHub仓库名称，用于GitHub Pages部署
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': './', // 使用相对路径代替path.resolve
    }
  }
});
