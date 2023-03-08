const formResponse = (statusCode, result, message, res) => {
  res.status(statusCode).send({
    data: result,
    message: message,
  });
};
module.exports = formResponse;
