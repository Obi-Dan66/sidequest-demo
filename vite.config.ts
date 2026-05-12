import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT) || 5173,
      strictPort: false,
    },
    preview: {
      host: true,
      port: 4173,
    },
    build: {
      sourcemap: true,
      target: 'es2022',
    },
  };
});
