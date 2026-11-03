// Import functions from the data layer
import { getExpenses, saveExpenses } from "../data/expenseFile.js";

// Add a new expense
export async function addExpense(amount, category) {
  try {
    // Convert the amount into a number
    const expenseAmount = Number(amount);

    // Validate the amount
    if (!Number.isFinite(expenseAmount) || expenseAmount <= 0) {
      console.log("Please enter a valid positive amount.");
      return;
    }

    // Validate the category
    if (!category || category.trim() === "") {
      console.log("Please provide a category.");
      return;
    }

    // Get existing expenses
    const expenses = await getExpenses();

    // Create a new expense
    const newExpense = {
      id: Date.now(),
      amount: expenseAmount,
      category: category.trim(),
      date: new Date().toISOString(),
    };

    // Add the new expense
    expenses.push(newExpense);

    // Save updated expenses
    await saveExpenses(expenses);

    console.log("Expense added successfully!");
  } catch (error) {
    console.log("Error adding expense:", error.message);
  }
}

// Display all expenses
export async function listExpenses() {
  try {
    // Get all expenses
    const expenses = await getExpenses();

    // Check whether expenses exist
    if (expenses.length === 0) {
      console.log("No expenses found.");
      return;
    }

    // Display each expense
    expenses.forEach((expense) => {
      console.log(
        `ID: ${expense.id} | Amount: ₹${expense.amount} | Category: ${expense.category}`,
      );
    });
  } catch (error) {
    console.log("Error listing expenses:", error.message);
  }
}
// Calculate the total amount of all expenses
export async function totalExpenses() {
  try {
    // Get all expenses from the data layer
    const expenses = await getExpenses();

    // Calculate the total amount
    const total = expenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    // Display the total
    console.log(`Total Expenses: ₹${total}`);
  } catch (error) {
    console.log("Error calculating expenses:", error.message);
  }
}

// Delete an expense using its ID
export async function deleteExpense(expenseId) {
  try {
    // Get all expenses
    const expenses = await getExpenses();

    // Check whether the expense exists
    const exists = expenses.some((expense) => {
      return expense.id === expenseId;
    });

    // Stop if the ID does not exist
    if (!exists) {
      console.log("Expense not found!");
      return;
    }

    // Keep all expenses except the selected ID
    const updatedExpenses = expenses.filter((expense) => {
      return expense.id !== expenseId;
    });

    // Save the updated expenses
    await saveExpenses(updatedExpenses);

    console.log("Expense deleted successfully!");
  } catch (error) {
    console.log("Error deleting expense:", error.message);
  }
}

// Filter expenses by category
export async function filterByCategory(searchCategory) {
  try {
    // Get all expenses
    const expenses = await getExpenses();

    // Find matching expenses
    const filteredExpenses = expenses.filter((expense) => {
      return expense.category.toLowerCase() === searchCategory.toLowerCase();
    });

    // Check whether matching expenses exist
    if (filteredExpenses.length === 0) {
      console.log("No expenses found in this category.");
      return;
    }

    // Display matching expenses
    filteredExpenses.forEach((expense) => {
      console.log(
        `ID: ${expense.id} | Amount: ₹${expense.amount} | Category: ${expense.category}`,
      );
    });
  } catch (error) {
    console.log("Error filtering expenses:", error.message);
  }
}

// Sort expenses by amount or date
export async function sortExpenses(sortType) {
  try {
    // Get all expenses
    const expenses = await getExpenses();

    // Check whether expenses exist
    if (expenses.length === 0) {
      console.log("No expenses available.");
      return;
    }

    // Create a copy of the expenses array
    const sortedExpenses = [...expenses];

    // Sort based on the selected option
    if (sortType === "amount") {
      // Highest amount first
      sortedExpenses.sort((a, b) => b.amount - a.amount);
    } else if (sortType === "date") {
      // Newest date first; records without dates go last
      sortedExpenses.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;

        return new Date(b.date) - new Date(a.date);
      });
    } else {
      console.log("Invalid sorting option.");
      return;
    }

    // Display sorted expenses
    sortedExpenses.forEach((expense) => {
      console.log(
        `ID: ${expense.id} | Amount: ₹${expense.amount} | Category: ${expense.category}`,
      );
    });
  } catch (error) {
    console.log("Error sorting expenses:", error.message);
  }
}
