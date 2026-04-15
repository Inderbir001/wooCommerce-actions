const axios = require("axios");
const config = require("../utils/config");

async function createProduct(simpleProductData, numOfProducts) {
  const productResults = [];
  for (let i = 0; i < numOfProducts; i++) {
    const payload = simpleProductData();

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
    console.log(`
      
${i + 1}. Products Created... ✅ 
➡️  Product ID: ${response.data.id}
➡️  Product Name: ${response.data.name}
            `);
  }
  return productResults;
}

module.exports = { createProduct };
