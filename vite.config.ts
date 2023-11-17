/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      enabled: true,
      all: true,
      include: ['src'],
      exclude: ['src/interfaces', 'src/models', '**/*.d.ts', 'src/main.tsx'],
      provider: 'v8', // istanbul or 'v8'
      reporter: ['text', 'html'],
      lines: 80,
      branches: 80,
      functions: 80,
      statements: 80,
    },
  },
});
