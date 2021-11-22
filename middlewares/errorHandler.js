const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong. Please try again",
  };

  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.message = `${Object.keys(err.keyValue)} already exists`;
  }

  if (err.name === "ValidationError") {
    customError.statusCode = 400;
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(". ");
  }

  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.message = `no item with the id of ${err.value}`;
  }
  res
    .status(customError.statusCode)
    .json({ success: false, message: customError.message });
};

module.exports = errorHandler;
