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

// const metaDataPropertiesHelper = {
//   id,
//   key,
//   value,
// };

// const orderLineItemsHelper = {
//   name,
//   product_id,
//   variation_id,
//   quantity,
//   tax_class,
//   subtotal,
//   total,
//   meta_data,
// };

// const taxLinespropertiesHelper = {
//   meta_data,
// };

// const shippingLinePropertiesHelper = {
//   method_title,
//   method_id,
//   total,
//   meta_data,
// };

// const feesLinesPropertiesHelper = {
//   name,
//   tax_class,
//   tax_status,
//   total,
//   meta_data,
// };

// const couponLinePropertiesHelper = {
//   code,
//   meta_data,
// };

// const updateOrder = {
//   parent_id,
//   status,
//   currency,
//   customer_id,
//   customer_note,
//   billing: {
//     first_name,
//     last_name,
//     company,
//     address_1,
//     address_2,
//     city,
//     state,
//     postcode,
//     country,
//     email,
//     phone,
//   },
//   shipping: {
//     first_name,
//     last_name,
//     company,
//     address_1,
//     address_2,
//     city,
//     state,
//     postcode,
//     country,
//   },
//   payment_method,
//   payment_method_title,
//   transaction_id,
//   meta_data,
//   line_items,
//   shipping_lines,
//   fee_lines,
//   coupon_lines,
// };

module.exports = { orderData };
