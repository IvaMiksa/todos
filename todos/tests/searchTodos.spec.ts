import { test, expect } from "@playwright/test";
import { addTodo } from "../helpers/todosHelpers";
 
 test("search todos", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
   await addTodo(page, "Take a walk");

    // Search for the added todo
    const inputSearch = page.locator('input[placeholder="Search todos"]');
    await inputSearch.fill("Take a w");

    // Assert that the search works
    const searchResult = page.locator(':text-is("Take a walk")');
    await expect(searchResult).toBeVisible();

    // Assert that case doesn't matter
    await inputSearch.fill("take a w");
    await expect(searchResult).toBeVisible();

    // Assert there are no results for invalid input
    await inputSearch.fill("take a shower");
    await expect(searchResult).not.toBeVisible();
  });