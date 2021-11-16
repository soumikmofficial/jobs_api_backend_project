const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorizedError } = require("../errors");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, name: user.name, token });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Missing email or password");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("invalid credentials");
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new UnauthorizedError("invalid credentials");
  }
  const token = user.createJWT();
  res.status(200).json({ success: true, name: user.name, token });
});
module.exports = { register, login };
