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

    const editSaveIcon = page.locator('#edit-save-icon');
    await editSaveIcon.click();

    // Assert the edited todo is visible
    const editedTodo = page.locator(':text-is("Take a bath")');
    await expect(editedTodo).toBeVisible();
  });


  test('edit a uncompleted todo', async ({page}) => {
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

    const editSaveIcon = page.locator('#edit-save-icon');
    await editSaveIcon.click();

    // Assert the edited todo is visible
    const editedTodo = page.locator(':text-is("Take a bath")');
    await expect(editedTodo).toBeVisible();

  })
  //test('search todos')
  //test('filter by status')
  //test('next page')
  //test('previous page')
  //test('persist new todo in local storage')
});
