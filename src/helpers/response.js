const response = (res, statusCode, message, data) => res.status(statusCode).json({
  message, data,
});

export default response;
