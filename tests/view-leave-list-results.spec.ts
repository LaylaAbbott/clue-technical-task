import test, { expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import { LoginPage } from '../pages/login-page';
import { LeavePage } from '../pages/leave-page';

test('should show Page Object Model article', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const loginPage = new LoginPage(page);
  await loginPage.enterUsername();
  await loginPage.enterPassword();
  await loginPage.loginButton.click();

  const dashboardPage = new DashboardPage(page);
  await expect(dashboardPage.pageHeader).toBeVisible();
  await dashboardPage.leaveSidebarButton.click();

  const leavePage = new LeavePage(page);
  await expect(leavePage.pageHeaderText).toBeVisible();
  
});
