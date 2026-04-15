#!/usr/bin/env node

const ora = require("ora");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const { faker } = require("@faker-js/faker");
const { createOrder } = require("../services/orderService");
const { createProduct } = require("../services/createProduct");

console.log(
  chalk.green(
    figlet.textSync("Woo Actions", {
      horizontalLayout: "full",
    }),
  ),
);

async function startCLI() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: `What do you want to do? :`,
      choices: [
        { name: "1. Create Order", value: "order" },
        { name: "2. Create Product", value: "product" },
        { name: "3. Exit", value: "exit" },
      ],
    },
  ]);

  // =========================
  //  CREATE ORDER
  // =========================

  if (answer.action === "order") {
    const inputs = await inquirer.prompt([
      {
        name: "name",
        message: "Enter customer name:",
      },
      {
        name: "product",
        message: "Enter product ID:",
        validate: (val) => !isNaN(val) || "Enter valid number",
      },
      {
        name: "qty",
        message: "Enter quantity:",
        validate: (val) => !isNaN(val) || "Enter valid number",
      },
      {
        name: "numOfOrders",
        message: "Enter number of orders:",
        validate: (val) => !isNaN(val) || "Enter valid number",
      },
    ]);

    const orderData = {
      shipping: {
        first_name: inputs.name,
        last_name: "Doe",
        address_1: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        postcode: faker.location.zipCode(),
        country: "US",
      },
      line_items: [
        {
          product_id: parseInt(inputs.product),
          quantity: parseInt(inputs.qty),
        },
      ],
    };

    try {
      const spinner = ora(`Creating ${inputs.numOfOrders} orders...`).start();

      await createOrder(orderData, parseInt(inputs.numOfOrders));

      spinner.succeed("Orders Created Successfully ✅");
    } catch (err) {
      console.log("❌ Error:", err.message);
    }
  }

  // =========================
  // CREATE PRODUCT
  // =========================
  else if (answer.action === "product") {
    const productData = {
      name: faker.commerce.productName(),
      type: "simple",
      description: faker.commerce.productDescription(),
      sku: faker.string.uuid(),
      regular_price: faker.commerce.price(),
    };

    try {
      const spinner = ora("Creating product...").start();
      const product = await createProduct(productData);
      spinner.succeed(`Product Created ✅ ID: ${product.id}
            `);
    } catch (err) {
      console.log("❌ Error:", err.message);
    }
  }

  // =========================
  //  EXIT
  // =========================
  else {
    console.log("👋 Exiting...");
    process.exit();
  }
}

startCLI();
