// Import expense functions from the service layer
import {
  addExpense,
  listExpenses,
  totalExpenses,
  deleteExpense,
  filterByCategory,
  sortExpenses,
} from "./services/expenseService.js";

// Get command-line arguments
const [command, amount, category, id] = process.argv.slice(2);

// Display all available commands
function showHelp() {
  console.log("\n========== EXPENSE TRACKER ==========\n");

  // Display the add command
  console.log("1. Add Expense");
  console.log("   node index.js add <amount> <category>\n");

  // Display the list command
  console.log("2. List Expenses");
  console.log("   node index.js list\n");

  // Display the total command
  console.log("3. Calculate Total");
  console.log("   node index.js total\n");

  // Display the delete command
  console.log("4. Delete Expense");
  console.log("   node index.js delete <id>\n");

  // Display the category command
  console.log("5. Filter by Category");
  console.log("   node index.js category <category>\n");

  // Display the sort command
  console.log("6. Sort Expenses");
  console.log("   node index.js sort <amount|date>\n");

  console.log("=====================================");
}
// Handle the requested command
async function main() {
  // Show help when no command is provided
  if (!command) {
    showHelp();
    return;
  }
  switch (command) {
    case "add":
      // Add a new expense
      await addExpense(amount, category);
      break;

    case "list":
      // Display all expenses
      await listExpenses();
      break;

    case "total":
      // Calculate total expenses
      await totalExpenses();
      break;

    case "delete":
      // Validate the expense ID
      if (!id || !Number.isSafeInteger(Number(id))) {
        console.log("Please provide a valid expense ID.");
        break;
      }

      // Delete the selected expense
      await deleteExpense(Number(id));
      break;

    case "category":
      // Validate the category
      if (!amount || amount.trim() === "") {
        console.log("Please provide a category name.");
        break;
      }

      // Filter expenses by category
      await filterByCategory(amount);
      break;

    case "sort":
      // Validate the sorting option
      if (!amount) {
        console.log("Please provide amount or date.");
        break;
      }

      // Sort expenses
      await sortExpenses(amount);
      break;
    case "help":
      // Display available commands
      showHelp();
      break;

    default:
      console.log("Invalid command.");
      console.log("Run 'node index.js help' to see available commands.");
  }
}

// Start the application
main();
