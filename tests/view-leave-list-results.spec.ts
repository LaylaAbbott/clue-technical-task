import test, { expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import { LoginPage } from '../pages/login-page';
import { LeavePage } from '../pages/leave-page';
import { changeLanguageIfNeeded } from '../api/changeLanguageIfNeeded';
import { waitForResponseAndReturnNumberOfResults } from '../api/waitForResponseAndReturnNumberOfResults';

test.describe
  .serial('Admin user can check the leave periods of employees over a specified date range', () => {
  test.beforeEach('User can log in to site as an admin', async ({ page }) => {
    // Go to page
    await page.goto('/web/index.php/auth/login');

    // Enter credentials and click log in
    const loginPage = new LoginPage(page);
    await loginPage.enterUsername();
    await loginPage.enterPassword();
    await loginPage.loginButton.click();

    // Expect the URL to change to the dashboard URL
    await expect(page).toHaveURL('/web/index.php/dashboard/index');
  });

  test('User can change language if needed and navigate to leave', async ({ page }) => {
    // Change language if needed
    await changeLanguageIfNeeded(page);

    // This expect won't work if the language hasn't been changed to english
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.pageHeader).toBeVisible();

    // Click Leave and assert the page loads
    await dashboardPage.leaveSidebarButton.click();
    const leavePage = new LeavePage(page);
    await expect(leavePage.pageHeaderText).toBeVisible();
  });

  test('User can search between two dates and view results', async ({ page }) => {
    // Click Leave
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.leaveSidebarButton.click();

    // Fill From Date with chosen date
    const leavePage = new LeavePage(page);
    await leavePage.fillDateField('From Date', '2001-09-12');

    // Fill To Date with chosen date
    await leavePage.fillDateField('To Date', '2024-09-12');

    // Click search
    await leavePage.searchButton.click();

    // Wait for the response from the BE and intercept the response to know how many results there are
    const resultsNumber = await waitForResponseAndReturnNumberOfResults(page);

    // Assert the search has taken place (different assertions for if there are results/no results)
    await leavePage.assertSearchHasTakenPlace(resultsNumber);
  });
});
