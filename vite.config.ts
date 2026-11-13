import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
  // A build de servidor (pré-renderização) só gera o módulo que renderiza o HTML: sem otimizador nem cópia de public/
  publicDir: isSsrBuild ? false : 'public',
  plugins: [
    react(),
    ...(isSsrBuild
      ? []
      : [
          ViteImageOptimizer({
            png: { quality: 80 },
            jpg: { quality: 80 },
            jpeg: { quality: 80 },
          }),
        ]),
  ],
  base: process.env.GITHUB_ACTIONS ? '/PORTFOLIO/' : '/Portifolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: isSsrBuild ? resolve(root, 'src/entry-server.tsx') : { main: resolve(root, 'index.html') },
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: isSsrBuild ? 'entry-server.mjs' : 'assets/[name].[hash].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(root, './src')
    }
  }
}));
