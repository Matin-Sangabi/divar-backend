const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { authLocales } = require("./auth.locales");
const { randomInt } = require("crypto");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  async checkOTP() {}

  async sendOTP(phone_number) {
    const user = await this.#model.findOne({ phone_number });
    const now = new Date().getTime();
    const expireIn = now + 1000 * 60 * 2;
    const newCode = randomInt(10000, 99999);

    if (!user) {
        //not exist user ==> so create user
        this.#model.create({
        phone_number,
        otp: {
          code: newCode,
          expireIn,
        },
      });
      return { message: "opt send", code: newCode };
    }
    if (user.otp.code && user.otp.expireIn > now) {
      throw new createHttpError.BadRequest("not expired time");
    }
    user.otp.code = newCode;
    user.otp.expireIn = expireIn;
    user.save();
    return { message: "opt send", code: newCode };
  }

  async checkExistPhone(phone_number) {
    const user = await this.#model.findOne({ phone_number });
    if (!user) {
      throw new createHttpError.NotFound(authLocales.notFound);
    }
  }
}

module.exports = new AuthService();
