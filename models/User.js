const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [4, "Name too short. Try full name"],
    maxLength: [50, "Name too long. Try firstname"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, `Email id is invalid`],
  },
  password: {
    type: String,
    minLength: [8, "Password too short. Try a dfferent one"],
    required: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 5);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

userSchema.methods.matchPassword = async function (passwordInput) {
  const isMatch = await bcrypt.compare(passwordInput, this.password);
  console.log(isMatch);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
