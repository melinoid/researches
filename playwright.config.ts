import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  reporter: 'list',
  timeout: 60000,

  use: {
    ...devices['Desktop Chrome'],
    locale: 'ru-RU',
    timezoneId: 'Asia/Yekaterinburg',
    video: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
    launchOptions: { slowMo: 0 },
    baseURL: 'https://scripture.api.bible',
  },

  projects: [
    // Global authorisation
    { name: 'login', testMatch: '**/setup/setup.login.ts' },
    // Authorized tests
    {
      name: 'authorized',
      testMatch: '**/e2e/authorized/@(suite|test).*.?(c|m)[jt]s?(x)',
      dependencies: ['login'],
      use: {
        storageState: '.temp/session.json',
      },
    },
    // API tests
    {
      name: 'api',
      timeout: 2000,
      testMatch: '**/api/**/@(suite|test).*.?(c|m)[jt]s?(x)',
      use: {
        baseURL: 'https://api.scripture.api.bible',
        extraHTTPHeaders: {
          accept: 'application/json',
          'api-key': `${process.env.AT_API_KEY}`,
        },
      },
    },
  ],
});
