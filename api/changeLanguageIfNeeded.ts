import { Page, expect } from '@playwright/test';

type Localization = { language: string; dateFormat: string };

export async function changeLanguageIfNeeded(page: Page) {
    // Call the api to get the current language
  const getResponse = await page.request.get('/web/index.php/api/v2/admin/localization');
  const getResponseJson = (await getResponse.json()) as Localization;
      // If the current language is not 'en_US', change it to that (and change date format to be safe)
  if (getResponseJson.language != 'en_US') {
    const putResponse = await page.request.put('/web/index.php/api/v2/admin/localization', {
      data: { language: 'en_US', dateFormat: 'Y-m-d' }, 
    });
    expect(putResponse.ok()).toBeTruthy();
    // Reload the page
    await page.reload();
  }
}
