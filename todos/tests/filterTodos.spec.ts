import { test, expect } from "@playwright/test";

test.describe("filter todos", () => {
  test("filter by status: completed todos", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputFieldCompletedTodo = page.locator(
      'input[placeholder="Your next todo"]'
    );
    await inputFieldCompletedTodo.fill("Take a walk");
    const buttonAddCompletedTodo = page.locator('button:text-is("Add")');
    await buttonAddCompletedTodo.click();

    // Mark todo as completed
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.click();

    // Add uncompleted todo
    const inputFieldUncompletedTodo = page.locator(
      'input[placeholder="Your next todo"]'
    );
    await inputFieldUncompletedTodo.fill("Bake a pie");
    const buttonAddUncompletedTodo = page.locator('button:text-is("Add")');
    await buttonAddUncompletedTodo.click();

    // Filter by status "completed"
    const filterByStatus = page.locator("#filter");
    await filterByStatus.selectOption({ label: "Completed" });

    // Assert that only completed todos are visible
    const completedTodo = page.locator(':text-is("Take a walk")');
    const uncompletedTodo = page.locator(':text-is("Bake a pie")');

    await expect(completedTodo).toBeVisible();
    await expect(uncompletedTodo).not.toBeVisible();
  });

  test("filter by status: uncompleted todos", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputFieldCompletedTodo = page.locator(
      'input[placeholder="Your next todo"]'
    );
    await inputFieldCompletedTodo.fill("Take a walk");
    const buttonAddCompletedTodo = page.locator('button:text-is("Add")');
    await buttonAddCompletedTodo.click();

    // Mark todo as completed
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.click();

    // Add uncompleted todo
    const inputFieldUncompletedTodo = page.locator(
      'input[placeholder="Your next todo"]'
    );
    await inputFieldUncompletedTodo.fill("Bake a pie");
    const buttonAddUncompletedTodo = page.locator('button:text-is("Add")');
    await buttonAddUncompletedTodo.click();

    // Filter by status "completed"
    const filterByStatus = page.locator("#filter");
    await filterByStatus.selectOption({ label: "Uncompleted" });

    // Assert that only completed todos are visible
    const completedTodo = page.locator(':text-is("Take a walk")');
    const uncompletedTodo = page.locator(':text-is("Bake a pie")');

    await expect(completedTodo).not.toBeVisible();
    await expect(uncompletedTodo).toBeVisible();
  });

  test("filter by status: all todos", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputFieldCompletedTodo = page.locator(
      'input[placeholder="Your next todo"]'
    );
    await inputFieldCompletedTodo.fill("Take a walk");
    const buttonAddCompletedTodo = page.locator('button:text-is("Add")');
    await buttonAddCompletedTodo.click();

    // Mark todo as completed
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.click();

    // Add uncompleted todo
    const inputFieldUncompletedTodo = page.locator(
      'input[placeholder="Your next todo"]'
    );
    await inputFieldUncompletedTodo.fill("Bake a pie");
    const buttonAddUncompletedTodo = page.locator('button:text-is("Add")');
    await buttonAddUncompletedTodo.click();

    // Filter by status "completed"
    const filterByStatus = page.locator("#filter");
    await filterByStatus.selectOption({ label: "All" });

    // Assert that only completed todos are visible
    const completedTodo = page.locator(':text-is("Take a walk")');
    const uncompletedTodo = page.locator(':text-is("Bake a pie")');

    await expect(completedTodo).toBeVisible();
    await expect(uncompletedTodo).toBeVisible();
  });


})