const express = require("express");
const router = express.Router();

const {
  createProduct,
  createVariableProduct,
} = require("../../services/productService.js");

router.post("/create-simple-product", async (req, res) => {
  try {
    const result = await createProduct(req.body, req.body.count);

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

router.post("/create-variable-product", async (req, res) => {
  try {
    const result = await createVariableProduct(
      req.body,
      req.body,
      req.body.count,
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

module.exports = router;
