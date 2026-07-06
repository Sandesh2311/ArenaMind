import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }

          if (id.includes('node_modules/victory-vendor') || id.includes('node_modules/d3-')) {
            return 'chart-vendor';
          }

          if (id.includes('node_modules/recharts')) {
            return 'charts';
          }

          if (id.includes('src/services/geminiService') || id.includes('src/services/fallbackResponses')) {
            return 'ai';
          }

          return undefined;
        }
      }
    }
  },
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
