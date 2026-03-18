import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 确保在子路径（例如 GitHub Pages）下资源路径也能正确加载
  // 否则 index.html 中会生成以 /assets 开头的绝对路径，导致静态演示空白。
  base: './',
  server: { port: 5173, open: true },
});
