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

    // Unmark the todo
    await checkbox.click(); // uncheck??

    // Assert the todo is no longer marked as completed
    await expect(completedTodo).not.toBeVisible();
    await expect(checkbox).not.toBeChecked();
  });

  test("delete a completed todo", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill("Take a walk");
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();

    // Mark todo as completed
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.click(); // vs check() ??

    // Delete completed todo
    const deleteIcon = page.locator("#delete-icon");
    await deleteIcon.click();

    // Assert the deleted todo is no longer visible
    const deletedTodo = page.locator(':text-is("Take a walk")');
    await expect(deletedTodo).not.toBeVisible();
  });

  test("delete an uncompleted todo", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill("Take a walk");
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();

    // Delete uncompleted todo
    const deleteIcon = page.locator("#delete-icon");
    await deleteIcon.click();

    // Assert the deleted todo is no longer visible
    const deletedTodo = page.locator(':text-is("Take a walk")');
    await expect(deletedTodo).not.toBeVisible();
  });

  test("edit a completed todo", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill("Take a walk");
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();

    // Mark todo as completed
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.click();

    // Edit completed todo
    const editIcon = page.locator("#edit-icon");
    await editIcon.click();

    const inputFieldEdit = page.locator('input[value="Take a walk"]');
    await inputFieldEdit.fill("Take a bath");

    const editSaveIcon = page.locator("#edit-save-icon");
    await editSaveIcon.click();

    // Assert the edited todo is visible
    const editedTodo = page.locator(':text-is("Take a bath")');
    await expect(editedTodo).toBeVisible();
  });

  test("edit a uncompleted todo", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill("Take a walk");
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();

    // Edit uncompleted todo
    const editIcon = page.locator("#edit-icon");
    await editIcon.click();

    const inputFieldEdit = page.locator('input[value="Take a walk"]');
    await inputFieldEdit.fill("Take a bath");

    const editSaveIcon = page.locator("#edit-save-icon");
    await editSaveIcon.click();

    // Assert the edited todo is visible
    const editedTodo = page.locator(':text-is("Take a bath")');
    await expect(editedTodo).toBeVisible();
  });

  test("search todos", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Add a new todo
    const inputField = page.locator('input[placeholder="Your next todo"]');
    await inputField.fill("Take a walk");
    const buttonAdd = page.locator('button:text-is("Add")');
    await buttonAdd.click();

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

  test("pagination", async ({ page }) => {
    await page.goto("http://localhost:5173");

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

  //test('persist new todo in local storage')
});
