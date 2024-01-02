const autoBind = require("auto-bind");
const authService = require("./auth.service");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async checkOTP(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async sendOTP(req, res, next) {
    try {
      const { phone_number } = req.body;
      const data = await this.#service.sendOTP(phone_number);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
