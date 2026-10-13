import { type Locator, type Page } from '@playwright/test';

export class LeavePage {
    readonly page: Page;
    readonly pageHeaderText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeaderText = page.getByRole('heading', { name: 'Leave List' });
    }

}
