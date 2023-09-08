const express = require("express");
const {
  createOrder,
  fetchUserOrdersById,
  fetchAdminProducts,
  updateOrder,
} = require("../controller/Order");

const router = express.Router();

router
  .get("/user/:id", fetchUserOrdersById)
  .post("/", createOrder)
  .get("/", fetchAdminProducts)
  .patch("/:id", updateOrder);

exports.router = router;
