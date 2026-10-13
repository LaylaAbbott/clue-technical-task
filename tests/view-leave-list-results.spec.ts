import test, { expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import { LoginPage } from '../pages/login-page';
import { LeavePage } from '../pages/leave-page';
import { changeLanguageIfNeeded } from '../api/changeLanguageIfNeeded';

let baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php'

test.beforeEach('User can log in to site as an admin', async ({page }) => {
    // Go to page
    await page.goto(`${baseUrl}/auth/login`);
    
    // Enter credentials and click log in
    const loginPage = new LoginPage(page);
    await loginPage.enterUsername();
    await loginPage.enterPassword();
    await loginPage.loginButton.click();

    // Expect the URL to change to the dashboard URL
    await expect(page).toHaveURL(`${baseUrl}/dashboard/index`)
});

test('User can navigate to leave and search between two dates', async ({ page }) => {
    // Change language if needed
    await changeLanguageIfNeeded(page)

    // This expect won't work if the language hasn't been changed to english
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.pageHeader).toBeVisible();
    
    // Click Leave
    await dashboardPage.leaveSidebarButton.click();
    const leavePage = new LeavePage(page);
    await expect(leavePage.pageHeaderText).toBeVisible();
   
});
/*
 await leavePage.changeCalendarYearTo2024()
