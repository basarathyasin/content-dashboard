import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:5137',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});