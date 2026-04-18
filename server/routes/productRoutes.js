const express = require("express");
const router = express.Router();

const {
  createProduct,
  createVariableProduct,
  retrieveProductService,
} = require("../../services/productService.js");

router.post("/create-simple-product", async (req, res) => {
  try {
    const result = await createProduct(req.body, Number(req.body.count) || 1);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error: ", err.res?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.res?.message || err.message,
    });
  }
});

router.post("/create-variable-product", async (req, res) => {
  try {
    const result = await createVariableProduct(
      req.body,
      req.body,
      Number(req.body.count) || 1,
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/retrieve-product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const result = await retrieveProductService(productId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
});

module.exports = router;
