import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/types/',
        '**/*.d.ts',
        '**/*.test.ts',
        'src/test/',
      ],
    },
    deps: {
      optimizer: {
        ssr: {
          include: ['@raycast/api']
        }
      }
    },
    alias: {
      '@raycast/api': resolve(__dirname, './src/test/__mocks__/@raycast/api.ts')
    }
  },
}); 