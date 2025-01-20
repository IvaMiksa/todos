import { test, expect } from "@playwright/test";

test("app loading", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await expect(page).toHaveURL(baseURL);
});