const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
};

module.exports = errorHandler;
