const express = require("express");
const { fetchUserOrders, createOrder } = require("../controller/Order");

const router = express.Router();

router.get("/", fetchUserOrders).post("/", createOrder);

exports.router = router;
