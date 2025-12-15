import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@tishal-et-dudu/api': fileURLToPath(new URL('../../packages/api/src', import.meta.url)),
      '@tishal-et-dudu/shared': fileURLToPath(new URL('../../packages/shared/src', import.meta.url)),
      '@tishal-et-dudu/ui': fileURLToPath(new URL('../../packages/ui/src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['@tishal-et-dudu/shared', '@tishal-et-dudu/ui', '@tishal-et-dudu/api'],
  },
});


