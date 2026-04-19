const inquirer = require("inquirer");

async function showMainMenu() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        { name: "1. Create Order", value: "order" },
        { name: "2. Create Product", value: "product" },
        { name: "3. Retrieve Product", value: "retrieveProduct" },
        { name: "4. Fetch all Products", value: "fetchAllProducts" },
        { name: "5. Duplicate Product", value: "duplicateProduct" },
        { name: "6. Exit", value: "exit" },
      ],
    },
  ]);

  return answer.action;
}

module.exports = { showMainMenu };
