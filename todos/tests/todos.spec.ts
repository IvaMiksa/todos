import { test, expect } from "@playwright/test";

test.describe("Todos App", () => {
  test("app loading", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page).toHaveURL("http://localhost:5173");
  });

  test("add a new todo", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill("Take a walk");
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();

    // Assert the new todo is visible
    const newTodoAdded = page.locator(':text-is("Take a walk")');
    await expect(newTodoAdded).toBeVisible();
  });

  test("mark todo as completed", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill("Take a walk");
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();

    // Mark todo as completed
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.click(); // vs check() ??

    // Assert the completed todo is visible
    const completedTodo = page.locator(".line-through");
    await expect(completedTodo).toBeVisible();
    await expect(checkbox).toBeChecked();
  });

  //test('unmark todo as completed')
  //test('delete a todo')
  //test('edit a todo')
  //test('search todos')
  //test('filter by status')
  //test('next page')
  //test('previous page')
  //test('persist new todo in local storage')
});
