const express = require("express");
const { fetchUserInfoById, updateUserById } = require("../controller/User");
const router = express.Router();

router.get("/:id", fetchUserInfoById).patch("/:id", updateUserById);

exports.router = router;
