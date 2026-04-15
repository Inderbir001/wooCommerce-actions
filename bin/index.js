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
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
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
    const inputs = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "What kind of product do you want to order?",
        choices: [
          { name: "> Simple Product", value: "simple" },
          { name: "> Variable Product", value: "variable" },
        ],
      },
      {
        name: "price",
        message: "Please enter the product price : ",
      },
      {
        name: "weight",
        message: "Please enter the weight in Store units : ",
      },
      {
        name: "length",
        message:
          "Please enter the product Dimensions in Store units (length) : ",
      },
      {
        name: "width",
        message:
          "Please enter the product Dimensions in Store units (width) : ",
      },
      {
        name: "height",
        message: "Please enter the product Dimensions in Store units (height) ",
      },
      {
        name: "numOfProducts",
        message: "Please enter the number of products you want to create ",
      },
    ]);

    const simpleProductData = () => ({
      name: faker.commerce.productName(),
      type: "simple",
      status: "publish",
      regular_price: inputs.price,
      description: faker.commerce.productDescription(),
      sku: faker.string.uuid(),
      weight: String(inputs.weight),
      dimensions: {
        length: String(inputs.length),
        width: String(inputs.width),
        height: String(inputs.height),
      },
      manage_stock: true,
      stock_quantity: 111111,
    });

    if (inputs.type === "simple") {
      try {
        const spinner = ora(
          `Creating ${inputs.numOfProducts} products...`,
        ).start();
        const product = await createProduct(
          simpleProductData,
          inputs.numOfProducts,
        );

        spinner.succeed(`Product Creation Completed`);
      } catch (err) {
        console.log("❌ Error:", err.message);
      }
    }

    // if (inputs.type === "variable") {
    //   try {
    //     const spinner = ora("Creating product...").start();
    //     const product = await createProduct(productData);
    //     spinner.succeed(`Product Created ✅ ID: ${product.id}
    //         `);
    //   } catch (err) {
    //     console.log("❌ Error:", err.message);
    //   }
    // }
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
