const express = require("express");
const router = express.Router();

const {
  createOrder,
  updateOrderService,
} = require("../../services/orderService");

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

router.put("/update-order", async (req, res) => {
  try {
    const { orderId, updateDetails } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required",
      });
    }

    const result = await updateOrderService(orderId, updateDetails);

    console.log("Order updated", result);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message || error.message || "Something failed",
    });
  }
});

module.exports = router;
