import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 1000,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    environmentMatchGlobs: [
      [
        'tests/*/*.test.[c|m]js',
        'tests/*/*integration*.test.{js,mjs,cjs,ts}',
        'node',
      ]
    ],
    exclude: ['node_modules']
  }
})