import { test, expect } from "@playwright/test";


test("pagination", async ({ page, baseURL }) => {
  await page.goto(baseURL);

  // Generate 6 todos to get 2 pages
  for (let i = 1; i < 7; i++) {
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill(`Todo #${i}`);
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();
  }

  // Next page
  const nextPageButton = page.locator('button:text-is("Next")');
  await nextPageButton.click();

  const todoOnSecondPage = page.locator(':text-is("Todo #6")');
  await expect(todoOnSecondPage).toBeVisible();

  // Previous page
  const previousPageButton = page.locator('button:text-is("Previous")');
  await previousPageButton.click();

  const firstPageTodosCount = await page.locator("li").allTextContents();
  await expect(firstPageTodosCount.length).toBe(5);
});
