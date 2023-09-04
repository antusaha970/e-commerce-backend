const express = require("express");
const { getAllCategories, createCategory } = require("../controller/Category");

const router = express.Router();

router.get("/", getAllCategories).post("/", createCategory);

exports.router = router;
