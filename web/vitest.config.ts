/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    env: {
      NEXT_PUBLIC_SUPABASE_URL: 'test-url',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-key',
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
    },
  },
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: '/$1',
      },
    ],
  },
});
