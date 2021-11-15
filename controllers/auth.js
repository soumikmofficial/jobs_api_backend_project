const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/User");

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, user: user.name, token });
});

const login = asyncWrapper(async (req, res) => {
  res.status(200).json({ success: true, message: "user logged in" });
});

module.exports = { register, login };
