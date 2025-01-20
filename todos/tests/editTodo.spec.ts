import { test, expect } from "@playwright/test";
import { addTodo } from "../helpers/todosHelpers";

test.beforeEach('navigate to todos app', async({page, baseURL}) => {
  await page.goto(baseURL);
  
  })

test.describe("edit a todo", () => {
  test("edit a completed todo", async ({ page }) => {

    // Add a new todo
    await addTodo(page, "Take a walk");

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

    // Add a new todo
    await addTodo(page, "Take a walk");

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


})