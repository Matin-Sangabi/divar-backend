const { Router } = require("express");
const authController = require("./auth.controller");

const router = Router();

router.post("/sendOPT", authController.sendOTP);

module.exports = {
  authRouter: router,
};
