import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/tests/setupTests.ts'],
    coverage: {
      provider: 'v8',
      all: true,
    },
    exclude: ['node_modules'],
  },
});
