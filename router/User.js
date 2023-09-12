const express = require("express");
const { fetchUserInfoById, updateUserById } = require("../controller/User");
const router = express.Router();

router.get("/own", fetchUserInfoById).patch("/:id", updateUserById);

exports.router = router;
