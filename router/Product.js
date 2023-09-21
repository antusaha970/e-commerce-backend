const express = require("express");
const {
  createProduct,
  fetchAllFilteredProduct,
  fetchProductById,
  updateProductById,
  fetchSearchProducts,
  getSuggestedProducts,
} = require("../controller/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllFilteredProduct)
  .get("/search", fetchSearchProducts)
  .get("/:id", fetchProductById)
  .get("/suggestion/:category", getSuggestedProducts)
  .patch("/:id", updateProductById);

exports.router = router;
