const Service = require("../services");
const { ValidationError } = require("../utils/error");
const {SuccessResponse, ErrorResponse} = require('../utils/comman');
const StatusCodes = require("../utils/constants/statuscodes");
const addUser = async(req,res) => {
    try {
    const {name,age,email,password,role} = req.body;
        const user = await Service.user.createUser({name,age,email,password,role})
        SuccessResponse.data = user;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    ErrorResponse.error = error;
          return res
                   .status(status)
                   .json(ErrorResponse);}


}

module.exports = {
    addUser
}