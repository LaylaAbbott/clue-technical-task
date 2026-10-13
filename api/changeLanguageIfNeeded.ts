import { Page, expect } from '@playwright/test';

type Localization = { language: string; dateFormat: string };

export async function changeLanguageIfNeeded(page: Page) {
    const getResponse = await page.request.get('/web/index.php/api/v2/admin/localization');
    const getResponseJson: Localization = await getResponse.json()
    if (getResponseJson.language != "en_US") {
        const putResponse = await page.request.put('/web/index.php/api/v2/admin/localization', {
            data: { language: "en_US", dateFormat: 'Y-m-d' },
        });
        expect(putResponse.ok()).toBeTruthy();
        const putResponseJson: Localization = await putResponse.json()
        expect(putResponseJson.language).toEqual("en_US");
        await page.reload();
    }
}