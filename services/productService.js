const axios = require("axios");
const config = require("../utils/config");
const {
  getSimpleProductData,
  getVariableProductData,
  getVariantData,
} = require("../cli/data/productData");

async function createProduct(simpleProductInput, numOfProducts) {
  const productResults = [];

  for (let i = 0; i < numOfProducts; i++) {
    const payload = getSimpleProductData(simpleProductInput);

    const response = await axios.post(
      `${config.baseUrl}/wp-json/wc/v3/products`,
      payload,
      {
        auth: {
          username: config.key,
          password: config.secret,
        },
      },
    );
    productResults.push(response.data);
    console.log(
      ` > > > ${i + 1}. Simple Products Created... ✅   ➡️  Product ID: ${response.data.id}  ➡️  Product Name: ${response.data.name}`,
    );
  }
  return productResults;
}

const createVariableProduct = async function (
  variableInput,
  variantInput,
  numOfProducts,
) {
  const result = [];
  for (let i = 0; i < numOfProducts; i++) {
    const payload = getVariableProductData(variableInput);
    const variantPayload = getVariantData(variantInput);
    const variableRes = await axios.post(
      `${config.baseUrl}/wp-json/wc/v3/products`,
      payload,
      {
        auth: {
          username: config.key,
          password: config.secret,
        },
      },
    );
    result.push(variableRes.data);
    console.log(
      ` > > > ${i + 1}. Variable Products Created...👍   ➡️  Product ID: ${variableRes.data.id}  ➡️  Product Name: ${variableRes.data.name}`,
    );

    const variantRes = await axios.post(
      `${config.baseUrl}/wp-json/wc/v3/products/${variableRes.data.id}/variations`,
      variantPayload,
      {
        auth: {
          username: config.key,
          password: config.secret,
        },
      },
    );
    console.log(
      `          Variants Created, Variant ID: ${variantRes.data.id} 
      `,
    );
  }
  return result;
};

module.exports = { createProduct, createVariableProduct };
