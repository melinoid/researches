import { test } from '../../../utils/fixtures';

// To complete this case, you must have a saved session.
test('Relogin', async ({ page, loginPage, commonPage }) => {
  await test.step('Open main page', async () => {
    await page.goto('/');
  });
  await test.step('Get unauthorized', async () => {
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.waitForLoadState('load');
    await commonPage.checkLogoutLink();
  });
  await test.step('Go to Apps link', async () => {
    await page.getByRole('link', { name: 'Apps' }).click();
  });
  await test.step('get authorized', async () => {
    await loginPage.fillOutForm();
  });
});
