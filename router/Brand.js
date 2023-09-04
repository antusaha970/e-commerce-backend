const express = require("express");
const { getAllBrands, createBrand } = require("../controller/Brand");

const router = express.Router();

router.get("/", getAllBrands).post("/", createBrand);

exports.router = router;
