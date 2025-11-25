// 简化的Vite配置，避免依赖问题
export default {
  // 为GitHub Pages设置基础路径
  base: '/plant-guard-dos/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [],
  resolve: {
    alias: {
      '@': './',
    }
  }
}
