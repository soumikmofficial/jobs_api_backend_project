const asyncWrapper = require("../middlewares/asyncWrapper");

const register = asyncWrapper(async (req, res) => {
  res.status(201).json({ success: true, message: "user registered" });
});
const login = asyncWrapper(async (req, res) => {
  res.status(200).json({ success: true, message: "user logged in" });
});

module.exports = { register, login };
