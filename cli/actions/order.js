const inquirer = require("inquirer");
const ora = require("ora");
const { faker } = require("@faker-js/faker");
const { createOrder } = require("../../services/orderService");

async function handleOrder() {
  const inputs = await inquirer.prompt([
    {
      name: "product",
      message: "Enter product ID of the product you want to order:",
      validate: (val) => !isNaN(val) || "Enter valid number",
    },
    {
      name: "qty",
      message: "Enter quantity:",
      validate: (val) => !isNaN(val) || "Enter valid number",
    },
    {
      name: "numOfOrders",
      message: "Enter number of orders you want to create:",
      validate: (val) => !isNaN(val) || "Enter valid number",
    },
  ]);

  const orderData = {
    status: "processing",
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

  const spinner = ora(`Processing`).start();

  try {
    await createOrder(orderData, parseInt(inputs.numOfOrders));
    spinner.succeed("Orders Created Successfully ✅");
  } catch (err) {
    spinner.fail("Failed ❌");
    console.log(err.message);
  }
}

module.exports = { handleOrder };
