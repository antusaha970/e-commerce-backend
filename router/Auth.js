const express = require("express");
const {
  createUser,
  loginUser,
  checkUser,
  logOutUser,
} = require("../controller/Auth");
const passport = require("passport");
const router = express.Router();

router
  .post("/signup", createUser)
  .get("/check", passport.authenticate("jwt"), checkUser)
  .get("/logout", logOutUser)
  .post("/login", passport.authenticate("local"), loginUser);

exports.router = router;
