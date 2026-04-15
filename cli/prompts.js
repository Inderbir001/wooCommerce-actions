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
        { name: "3. Exit", value: "exit" },
      ],
    },
  ]);

  return answer.action;
}

module.exports = { showMainMenu };
