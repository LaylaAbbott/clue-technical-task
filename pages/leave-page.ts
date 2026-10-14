import { expect, type Locator, type Page } from '@playwright/test';

export class LeavePage {
  readonly page: Page;
  readonly pageHeaderText: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeaderText = page.getByRole('heading', { name: 'Leave List' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  getDateFieldFromTitle(fieldName: string): Locator {
    return (
      this.page
        // tried to use div as it was more general but it didn't resolve to a single element
        // NOTE: I'M NOT HAPPY ABOUT USING THIS LOCATOR, IT WOULD BE BETTER IF THE FIELD HA
        .locator('.oxd-grid-item')
        .filter({ has: this.page.locator('label', { hasText: fieldName }) })
        .getByPlaceholder('yyyy-mm-dd')
    );
  }

  async fillDateField(fieldName: string, date: string) {
    await this.getDateFieldFromTitle(fieldName).fill(`${date} \n`);
  }

  async assertSearchHasTakenPlace(numberOfResults: number) {
    if (numberOfResults == 0) {
      // Assert at least one toast message appears if there are no results
      expect(await this.page.getByText('Info', { exact: true }).count(), {
        message: 'No toast message displayed',
      }).toBeGreaterThanOrEqual(1);
    } else {
      // Assert that at least one row of results is shown if there are results
      // NOTE: I'M NOT HAPPY ABOUT USING THIS LOCATOR
      expect(await this.page.locator('.oxd-table-card').count()).toBeGreaterThanOrEqual(1);
    }
  }
}
