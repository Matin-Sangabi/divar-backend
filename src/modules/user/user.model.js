const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, default: undefined },
  expireIn: { type: Number, default: 0 },
});

const UserSchema = new Schema(
  {
    phone_number: { type: String, required: true, unique: true },
    full_name: { type: String },
    otp: { type: OTPSchema },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = model("users", UserSchema);

module.exports = UserModel;
