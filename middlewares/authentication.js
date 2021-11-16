const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");
const asyncWrapper = require("../middlewares/asyncWrapper");

const authentication = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("Access denied due to bad or no token");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new UnauthorizedError("Accss Denied");
    }
    req.user = { userId: user.userId, name: user.name };
    next();
  });
});

module.exports = authentication;
