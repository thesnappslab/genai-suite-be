const jwt = require('jsonwebtoken');
const { statusDescriptions, statusCodes, statusMessages } = require('../constants/MessageConstants');
const { ACCESS_SECRET } = require('../constants/AppConstants');
const { logDebugToConsole, raiseCustomException } = require('../utils/AppUtils');
const User = require('../models/User');
const { UserSerializer } = require('../serializers/UserSerializer');

const userAuthentication = async (req, res, next) => {
  try{
    const token = req.headers.authorization;
    if (!token) {
      (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_DENIED} ${statusDescriptions.ACCESS_TOKEN_MISSING}`, statusCodes.EXPECTATION_FAILED)})()
    }
    const tokensplit= token.split(" ");
    jwt.verify(tokensplit[1], ACCESS_SECRET, async (err, decoded) => {
      if (err) {
          (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_TOKEN_FAILED} ${statusDescriptions.ACCESS_TOKEN_EXPIRED}`, statusCodes.TOKEN_EXPIRED)})()
      }
      const user = await User.findOne({ _id: decoded.id });
      req.user = UserSerializer(user);
      next();
    });
  }catch(err){
    logDebugToConsole("Token Error: "+err.toString(), "error")
    if(err.type && err.type==="custom"){
        res.status(err.code).send({
            success: false,
            message: err.message
        });
    }else{
        res.status(statusCodes.SERVER_ERROR).send({
            data: err,
            success: false,
            message: statusMessages.INTERNAL_SERVER_ERROR
        });
    } 
  }
};
const checkUser = roles => (req, res, next) => {
    try{
        if(!req.user){
            (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_DENIED} ${statusDescriptions.USER_DATA_MISSING}`, statusCodes.FORBIDDEN)})()
        }
        if(!req.user.isActivated){
            (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_DENIED} ${statusDescriptions.USER_NOT_ACTIVATED}`, statusCodes.FORBIDDEN)})()
        }
        if(req.user.forcePasswordChange){
            (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_DENIED} ${statusDescriptions.USER_PWD_CHANGE}`, statusCodes.FORBIDDEN)})()
        }
        if(!roles.includes(req.user.role)){
            (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_DENIED} ${statusDescriptions.USER_NOT_AUTHORISED}`, statusCodes.FORBIDDEN)})()
        }
        next();
    }catch(err){
      logDebugToConsole("Check User Error: "+err.toString(), "error")
      if(err.type && err.type==="custom"){
          res.status(err.code).send({
              success: false,
              message: err.message
          });
      }else{
          res.status(statusCodes.SERVER_ERROR).send({
              data: err,
              success: false,
              message: statusMessages.INTERNAL_SERVER_ERROR
          });
      } 
    }
};
module.exports = { userAuthentication, checkUser };