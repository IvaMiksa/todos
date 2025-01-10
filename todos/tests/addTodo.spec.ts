import { test, expect } from "@playwright/test";
import { addTodo } from "../helpers/todosHelpers";

test("add a new todo", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Add a new todo
  await addTodo(page, "Take a walk");

  // Assert the new todo is visible
  const newTodoAdded = page.locator(':text-is("Take a walk")');
  await expect(newTodoAdded).toBeVisible();
});
