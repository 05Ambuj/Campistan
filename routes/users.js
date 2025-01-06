const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../controllers/auth");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router
  .route("/register")
  .get(auth.renderRegister)
  .post(catchAsync(auth.register));

router
  .route("/login")
  .get(auth.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    auth.login
  );

router.get("/logout", auth.logout);

module.exports = router;
