import { test as setup } from '../../utils/fixtures';

setup('Login', async ({ page, loginPage }) => {
  await setup.step('Open login page', async () => {
    await page.goto('/login');
  });
  await setup.step('Get authorized', async () => {
    await loginPage.fillOutForm();
  });
  await setup.step('Save session', async () => {
    await page.context().storageState({ path: '.temp/session.json' }); // Session lifetime: 24M
  });
});
