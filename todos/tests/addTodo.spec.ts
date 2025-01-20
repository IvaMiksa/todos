import { test, expect } from "@playwright/test";
import { addTodo } from "../helpers/todosHelpers";

test.beforeEach('navigate to todos app', async({page, baseURL}) => {
await page.goto(baseURL);

})

test.describe("add todo", () => {

  test("add a valid todo", async ({ page }) => {

  // Add a new todo
  await addTodo(page, "Take a walk");

  // Assert the new todo is visible
  const newTodoAdded = page.locator(':text-is("Take a walk")');
  await expect(newTodoAdded).toBeVisible();
});

test("add an empty todo", async({page}) => {

  const inputField = page.locator('input[placeholder="Your next todo"]');
  await inputField.fill("");
  const buttonAdd = page.locator('button:text-is("Add")');
  await buttonAdd.click();

  // Assert that are no new todos
  const todos = await page.locator("li").count();
  expect(todos).toBe(0);


})
})


