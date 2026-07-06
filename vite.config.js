import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 85,
        lines: 90
      },
      exclude: ['src/main.jsx']
    }
  }
});
