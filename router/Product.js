const express = require("express");
const {
  createProduct,
  fetchAllFilteredProduct,
  fetchProductById,
  updateProductById,
} = require("../controller/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllFilteredProduct)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProductById);

exports.router = router;