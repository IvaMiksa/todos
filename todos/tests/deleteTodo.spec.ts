import { test, expect } from "@playwright/test";
import { addTodo } from "../helpers/todosHelpers";

test.beforeEach('navigate to todos app', async({page, baseURL}) => {
  await page.goto(baseURL);
  
  })

test.describe("delete a todo", () => {
  test("delete a completed todo", async ({ page }) => {

    // Add a new todo
    await addTodo(page, "Take a walk");

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

    // Add a new todo
    await addTodo(page, "Take a walk");

    // Delete uncompleted todo
    const deleteIcon = page.locator("#delete-icon");
    await deleteIcon.click();

    // Assert the deleted todo is no longer visible
    const deletedTodo = page.locator(':text-is("Take a walk")');
    await expect(deletedTodo).not.toBeVisible();
  });


})