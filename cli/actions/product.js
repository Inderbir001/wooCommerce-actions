const inquirer = require("inquirer");
const ora = require("ora");
const { faker } = require("@faker-js/faker");
const { createProduct } = require("../../services/createProduct");

async function handleProduct() {
  const inputs = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "What kind of product do you want to create?",
      choices: [
        { name: "> Simple Product", value: "simple" },
        { name: "> Variable Product", value: "variable" },
      ],
    },
    { name: "price", message: "Enter price:" },
    { name: "weight", message: "Enter weight:" },
    { name: "length", message: "Enter length:" },
    { name: "width", message: "Enter width:" },
    { name: "height", message: "Enter height:" },
    {
      name: "numOfProducts",
      message: "How many products?",
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
    const spinner = ora(`Creating ${inputs.numOfProducts} products...`).start();

    try {
      await createProduct(simpleProductData, parseInt(inputs.numOfProducts));
      spinner.succeed("Products Created ✅");
    } catch (err) {
      spinner.fail("Failed ❌");
      console.log(err.message);
    }
  }
}

module.exports = { handleProduct };
