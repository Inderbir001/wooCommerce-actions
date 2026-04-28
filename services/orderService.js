const axios = require("axios");
const config = require("../utils/config");

const { orderData, updateOrderData } = require("../cli/data/orderData");

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

async function updateOrderService(orderId, updateDetails) {
  try {
    const response = await axios.put(
      `${config.baseUrl}/wp-json/wc/v3/orders/${orderId}`,
      updateDetails,
      {
        auth: {
          username: config.key,
          password: config.secret,
        },
      },
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update order");
  }
}

module.exports = { createOrder, updateOrderService };
