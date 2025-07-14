
const {Router} = require('express');
const Controller = require('../../../controllers');
const MiddleWare = require('../../../middlewares');
const userRoutes = Router();

userRoutes.post("/register",MiddleWare.User.validateUserInput,MiddleWare.asyncHandler(Controller.User.addUser));

module.exports = userRoutes