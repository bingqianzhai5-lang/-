// 简化配置以避免TypeScript错误
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
