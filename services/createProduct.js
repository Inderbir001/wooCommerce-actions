const axios = require("axios");
const config = require("../utils/config");

async function createProduct(productData) {
  const response = await axios.post(
    `${config.baseUrl}/wp-json/wc/v3/products`,
    productData,
    {
      auth: {
        username: config.key,
        password: config.secret,
      },
    },
  );

  return response.data;
}

module.exports = { createProduct };
