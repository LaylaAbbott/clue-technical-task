import { Page, expect } from '@playwright/test';

// I don't like giving data and rels the any type but to save time I did that here
type Results = { data: any; meta: { total: number }; rels: any };

export async function waitForResponseAndReturnNumberOfResults(page: Page): Promise<number> {
  const responsePromise = page.waitForResponse(
    '/web/index.php/api/v2/leave/employees/leave-requests?limit=50&offset=0&includeEmployees=onlyCurrent',
  );
  const response = await responsePromise;
  const responseJson = (await response.json()) as Results;
  return responseJson.meta.total;
}
