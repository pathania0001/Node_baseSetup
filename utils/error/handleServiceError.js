const { ApiError, ValidationError } = require("./index.js");
const StatusCode = require("../constants/statuscodes");

const handleServiceError = (error) => {

  if (error.name === "ValidationError") {
    const explanation = Object.keys(error.errors).map((key) => {
      const { name: error_type, message } = error.errors[key];
      return { error_type, message };
    });
    throw new ValidationError(explanation);
  }

    else if( error.name === "TypeError")
              throw new ApiError(error.messages,StatusCode.BAD_REQUEST)
             
     else if(error.code === 11000)
              throw new ApiError("User Already Exists",StatusCode.CONFLICT)
           

   else if (error.name === "CastError") {
    throw new ApiError(`Invalid key or value in data passed : ${error.path}`, StatusCode.BAD_REQUEST);
  }

   return null;
};

module.exports = handleServiceError;
