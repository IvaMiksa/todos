import { test, expect } from "@playwright/test";
import { addTodo } from "../helpers/todosHelpers";



test("mark todo as completed", async ({ page, baseURL }) => {
  await page.goto(baseURL);

    // Add a new todo
    await addTodo(page, "Take a walk");

    // Mark todo as completed
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.click(); // vs check() ??

    // Assert the completed todo is visible
    const completedTodo = page.locator(".line-through");
    await expect(completedTodo).toBeVisible();
    await expect(checkbox).toBeChecked();

    // Unmark the todo
    await checkbox.click(); // uncheck??

    // Assert the todo is no longer marked as completed
    await expect(completedTodo).not.toBeVisible();
    await expect(checkbox).not.toBeChecked();
  });