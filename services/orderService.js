const axios = require("axios");
const config = require("../utils/config");

async function createOrder(orderData, numOfOrders) {
  const results = [];
  const payload = orderData();
  for (let i = 0; i <= numOfOrders; i++) {
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
