const inquirer = require("inquirer");
const ora = require("ora");
const {
  createProduct,
  createVariableProduct,
} = require("../../services/productService");
const {
  getSimpleProductData,
  getVariableProductData,
  getVariantData,
} = require("../data/productData");

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
      message: "How many products of similar kind to create?",
    },
  ]);

  // Simple Product
  if (inputs.type === "simple") {
    const spinner = ora(`Processing`).start();

    try {
      await createProduct(inputs, parseInt(inputs.numOfProducts));
      spinner.succeed("Products Created ✅");
    } catch (err) {
      spinner.fail("Failed ❌");
      console.log(err.message);
    }
  }

  // Variable Product
  if (inputs.type === "variable") {
    const spinner = ora(`Processing`).start();

    try {
      await createVariableProduct(
        inputs,
        inputs,
        parseInt(inputs.numOfProducts),
      );
      spinner.succeed("Products Created ✅");
    } catch (err) {
      spinner.fail("Failed ❌");
      console.log(err.message);
    }
  }
}

module.exports = { handleProduct };
