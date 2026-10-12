import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly leaveSidebarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.leaveSidebarButton = page.getByRole('link', { name: 'Leave' });
  }
}
