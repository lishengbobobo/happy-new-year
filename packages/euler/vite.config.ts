import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? './' : '/zh/',
  build: {
    outDir: '../../dist/euler',
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        app: FileSystemIconLoader('../shared/svg-icons'),
      },
    }),
  ],
  server: {
    proxy: {
      '/zh/query': {
        target: 'https://omapi.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/zh/query', '/query'),
      },
    },
  },
});
