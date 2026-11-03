import { readFile, writeFile } from "node:fs/promises";

export async function getExpenses() {
  const data = await readFile("expenses..json", "utf-8");
  return JSON.parse(data);
}

export async function saveExpenses(expenses) {
  const data = JSON.stringify(expenses, null, 2);
  await writeFile("expenses.json", data);
}
