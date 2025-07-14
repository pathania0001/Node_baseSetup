const Service = require("../services");
const { ValidationError } = require("../utils/error");
const {SuccessResponse, ErrorResponse} = require('../utils/comman');
const StatusCodes = require("../utils/constants/statuscodes");
const addUser = async(req,res) => {
    const {name,age,email,password,role} = req.body;
        const user = await Service.user.createUser({name,age,email,password,role})
        SuccessResponse.data = user;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    
}

module.exports = {
    addUser
}