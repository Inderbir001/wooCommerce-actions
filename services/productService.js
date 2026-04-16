const axios = require("axios");
const config = require("../utils/config");

async function createProduct(getSimpleProductData, numOfProducts) {
  const productResults = [];

  for (let i = 0; i < numOfProducts; i++) {
    const payload = getSimpleProductData();

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
  getVariableData,
  getVariantData,
  numOfProducts,
) {
  const result = [];
  for (let i = 0; i < numOfProducts; i++) {
    const payload = getVariableData();
    const variantPayload = getVariantData();
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
};

module.exports = { createProduct, createVariableProduct };
