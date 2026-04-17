const express = require("express");
const router = express.Router();

const { createOrder } = require("../../services/orderService");

router.post("/create", async (req, res) => {
  try {
    const result = await createOrder(req.body, req.body.count);

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
