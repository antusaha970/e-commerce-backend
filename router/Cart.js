const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCartById,
} = require("../controller/Cart");

const router = express.Router();

router
  .get("/", fetchCartByUser)
  .post("/", addToCart)
  .delete("/:id", deleteFromCart)
  .patch("/:id", updateCartById);

exports.router = router;
