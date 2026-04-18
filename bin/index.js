#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");

const { showMainMenu } = require("../cli/mainMenu");
const { handleOrder } = require("../cli/actions/order");
const { handleProduct, retrieveProduct } = require("../cli/actions/product");

console.log(
  chalk.blue(
    figlet.textSync(
      `
  Woo Hoo !!!! Actions ...

`,
      {
        horizontalLayout: "default",
      },
    ),
  ),
);
console.log(chalk.greenBright(" version 1.0.0 by inderbir\n"));

async function startCLI() {
  const action = await showMainMenu();

  if (action === "order") {
    await handleOrder();
  } else if (action === "product") {
    await handleProduct();
  } else if (action === "retrieveProduct") {
    await retrieveProduct();
  } else {
    console.log("👋 Exiting...");
    process.exit();
  }
}

startCLI();
