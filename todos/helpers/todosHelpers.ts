export async function addTodo(page, todoName) {
  const inputField = page.locator('input[placeholder="Your next todo"]');
  await inputField.fill(todoName);
  const buttonAdd = page.locator('button:text-is("Add")');
  await buttonAdd.click();

}