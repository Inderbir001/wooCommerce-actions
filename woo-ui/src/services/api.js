import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const createOrder = (data) => API.post("/orders/create-order", data);

export const createSimpleProduct = (data) =>
  API.post("/products/create-simple-product", data);

export const createVariableProduct = (data) =>
  API.post("/products/create-variable-product", data);

export const retrieveProduct = (data) =>
  API.get(`/products/retrieve-product/${data.productId}`);
