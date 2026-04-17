const express = require("express");
const router = express.Router();

const { createOrder } = require("../../services/orderService");

router.post("/create-order", async (req, res) => {
  try {
    const result = await createOrder(req.body, Number(req.body.count) || 1);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error: ", err.res?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.res?.data || err.message,
    });
  }
});

module.exports = router;
