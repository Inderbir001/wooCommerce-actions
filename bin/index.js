#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");

const { showMainMenu } = require("../cli/prompts");
const { handleOrder } = require("../cli/actions/order");
const { handleProduct } = require("../cli/actions/product");

console.log(
  chalk.green(
    figlet.textSync("Woo Actions", {
      horizontalLayout: "full",
    }),
  ),
);

async function startCLI() {
  const action = await showMainMenu();

  if (action === "order") {
    await handleOrder();
  } else if (action === "product") {
    await handleProduct();
  } else {
    console.log("👋 Exiting...");
    process.exit();
  }
}

startCLI();
