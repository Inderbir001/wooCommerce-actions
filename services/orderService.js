const axios = require("axios");
const config = require("../utils/config");
const { orderData } = require("../cli/data/orderData");
async function createOrder(inputs, numOfOrders) {
  const results = [];
  for (let i = 0; i < numOfOrders; i++) {
    const payload = orderData(inputs);
    const response = await axios.post(
      `${config.baseUrl}/wp-json/wc/v3/orders`,
      payload,
      {
        auth: {
          username: config.key,
          password: config.secret,
        },
      },
    );
    results.push(response.data);
    console.log(
      ` > > > Completed ✅ Order ${i + 1} / ${numOfOrders} Created. Order ID:`,
      response.data.id,
    );
  }
  return results;
}

module.exports = { createOrder };
