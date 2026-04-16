const { faker } = require("@faker-js/faker");

const orderData = (inputs) => ({
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
});

module.exports = { orderData };
