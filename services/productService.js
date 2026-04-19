const axios = require("axios");
const config = require("../utils/config");
const {
  getSimpleProductData,
  getVariableProductData,
  getVariantData,
} = require("../cli/data/productData");
const chalk = require("chalk");

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

const retrieveProductService = async function (productId) {
  try {
    const response = await axios.get(
      `${config.baseUrl}/wp-json/wc/v3/products/${productId}`,
      {
        auth: {
          username: config.key,
          password: config.secret,
        },
      },
    );

    console.log(
      ` > > > Product Details fetched successfully. ✅

Response:`,
      response.data,
    );
    return response.data;
  } catch (err) {
    console.log(err.data?.response?.message || err.message);
  }
};

async function duplicateProductService(productId, numOfProducts) {
  const res = [];
  try {
    for (let i = 0; i < numOfProducts; i++) {
      const result = await axios.post(
        `${config.baseUrl}/wp-json/wc/v3/products/${productId}/duplicate`,
        {},
        {
          auth: {
            username: config.key,
            password: config.secret,
          },
        },
      );
      res.push(result.data);
      const publishResponse = await axios.put(
        `${config.baseUrl}/wp-json/wc/v3/products/${productId}`,
        {
          status: "publish",
        },
        {
          auth: {
            username: config.key,
            password: config.secret,
          },
        },
      );
      console.log(
        ` > > > Product Duplication Successful ${i + 1} of ${numOfProducts} times. ID: ${result.data.id}, Name: ${result.data.name}`,
      );
    }
    return res;
  } catch (error) {
    console.log(
      " > > > Product Duplication Failed : \n \n Response:",
      error.response?.data?.message || error.message,
    );
  }
}

async function fetchAllProductsService() {
  let page = 1;
  let totalPages = 1;
  let allProducts = [];

  try {
    while (page <= totalPages) {
      const response = await axios.get(
        `${config.baseUrl}/wp-json/wc/v3/products`,
        {
          params: {
            per_page: 100,
            page: page,
          },
          auth: {
            username: config.key,
            password: config.secret,
          },
        },
      );
      console.log("Page:", page, "Fetched:", response.data.length);
      totalPages = Number(response.headers["x-wp-totalpages"]);
      allProducts = [...allProducts, ...response.data];

      page++;
    }

    return allProducts;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

module.exports = {
  createProduct,
  createVariableProduct,
  retrieveProductService,
  duplicateProductService,
  fetchAllProductsService,
};
