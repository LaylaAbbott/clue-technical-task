import { type Locator, type Page } from '@playwright/test';

export class LeavePage {
    readonly page: Page;
    readonly pageHeaderText: Locator;
    readonly calendarCloseButton: Locator
    readonly calendarTodayButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.pageHeaderText = page.getByRole('heading', { name: 'Leave List' });
        this.calendarCloseButton = page.getByText("Close")
        this.calendarTodayButton = page.getByText("Close")
    }
    async openCalendar(fieldName: string) {
        await this.page
            //tried to use div as it was more general but it didn't resolve to a single element
            .locator('.oxd-grid-item')
            .filter({ has: this.page.locator('label', { hasText: fieldName }) })
            .getByPlaceholder('yyyy-mm-dd')
            .click();
    }

    async changeYearInCalendar(newYear: string) {
        await this.page.getByRole('listitem').filter({ hasText: '2026' }).click();
        await this.page.getByText(newYear).click({ force: true });
        await this.page.waitForTimeout(200)
        await this.page.screenshot({ path: 'screenshot3.png' });
    }

    async changeDayOfMonthInCalendar() {
        const dayOfMonth = new Date().getDate()
        if (dayOfMonth >= 28){
            // pick yesterday if the day is late in the month
            await this.page.getByText((dayOfMonth-1).toString(), { exact: true }).click();
        } else {
            // pick tomorrow otherwise
            await this.page.getByText((dayOfMonth+1).toString(), { exact: true }).click();
        }
    }

    async closeCalendarIfNeeded() {
        // I think I saw during exploratory that the calendar doesn't always close by itself
        if (await this.calendarCloseButton.isVisible()) {
            await this.calendarCloseButton.click()
        }
    }
}
