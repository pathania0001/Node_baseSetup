const { ErrorResponse } = require("../../utils/comman");

const globalError = (err, req, res, next) => {
   console.log("In global Error:",JSON.stringify(err,null,2));
  const statusCode = err.statusCode || 500;
  const errorDetails = err.errors || err.feilds;
  ErrorResponse.error =errorDetails;
  return res.status(statusCode).json(ErrorResponse);
};

module.exports = globalError;
