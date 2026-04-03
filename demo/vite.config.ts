import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 开发时走 dgj-biz 源码，避免改 table 等组件后未 build 仍加载旧 dist
      dgj-biz: path.resolve(__dirname, '../packages/dgj-biz/src/index.ts'),
    },
  },
  optimizeDeps: {
    // 避免 Vite dev 预打包 dgj-biz，导致其 dist 目录下静态图片的 URL 基准路径变化，进而出现图标/图片加载失败。
    exclude: ['dgj-biz'],
  },
  // 确保在子路径（例如 GitHub Pages）下资源路径也能正确加载
  // 否则 index.html 中会生成以 /assets 开头的绝对路径，导致静态演示空白。
  base: './',
  server: { port: 5173, open: true },
});
