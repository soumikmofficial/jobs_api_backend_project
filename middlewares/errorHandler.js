const errorHandler = (err, req, res, next) => {
  res.status(500).json({ success: false, message: err.mesage });
};

module.exports = errorHandler;
