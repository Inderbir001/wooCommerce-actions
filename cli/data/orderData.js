const { faker } = require("@faker-js/faker");

const orderData = (inputs) => {
  const state = faker.location.state({ abbreviated: true });

  return {
    status: "processing",
    shipping: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      address_1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: state,
      postcode: faker.location.zipCode(),
      country: "US",
    },
    billing: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      address_1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: state,
      postcode: faker.location.zipCode(),
      country: "US",
    },
    line_items: [
      {
        product_id: parseInt(inputs.product),
        quantity: parseInt(inputs.qty),
      },
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  };
};

module.exports = { orderData };
