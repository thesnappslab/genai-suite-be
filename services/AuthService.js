const { info, success, error } = require("consola");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { EQUAL_USERNAME_EMAIL, SUPER_ADMIN_FIRST_NAME, SUPER_ADMIN_LAST_NAME, SUPER_ADMIN_EMAIL, SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_GENDER, REFRESH_SECRET, ACCESS_SECRET } = require("../constants/AppConstants");
const User = require("../models/User");
const { raiseCustomException, logDebugToConsole } = require("../utils/AppUtils");
const { statusCodes, statusMessages, statusDescriptions } = require("../constants/MessageConstants");
const { UserSerializer } = require("../serializers/UserSerializer");

const createSuperAdmin = async() => {
    try{
        const existingSuperAdmin= await User.find({"role": 'superadmin'});
        if(existingSuperAdmin && existingSuperAdmin.length>0){
            info({message: "Super Admin Already Exists", badge: true})
        }else{
            const user= new User(
                {
                    firstname: SUPER_ADMIN_FIRST_NAME,
                    lastname: SUPER_ADMIN_LAST_NAME,
                    gender: SUPER_ADMIN_GENDER,
                    email:  SUPER_ADMIN_EMAIL,
                    username: EQUAL_USERNAME_EMAIL ? SUPER_ADMIN_EMAIL : SUPER_ADMIN_USERNAME,
                    password: await bcrypt.hash(SUPER_ADMIN_PASSWORD, 12),
                    lastLoginTime: null,
                    firstLogin: true,
                    isActivated: false,
                    forcePasswordChange: true,
                    role: "superadmin",
                    createdBy: "system",
                    updatedBy: "system",
                    tenant: null,
                    }
            );
            await user.save();
            success({message: "Super Admin Created Successfully", badge: true})
        }
    }catch(err){
        error({message: "Error occured while creating Super Admin"+err, badge: true})
    }
};

const loginUser = async(req, res) => {
    try{
        logDebugToConsole("User Login Object: "+req.toString(), "info")
        const { username, email, password }= req;
        if(!(username||email) || !password){
            (()=>{ throw raiseCustomException(`${statusMessages.LOGIN_FAILED} ${statusDescriptions.LOGIN_CREDENTIALS_MANDATORY}`, statusCodes.BAD_REQUEST)})()
        }
        const filter= {
            $or: [
              { username: username },
              { email: email }
            ]
          }
        const user= await User.findOne(filter);
        if(!user){
            (()=>{ throw raiseCustomException(`${statusMessages.LOGIN_FAILED} ${statusDescriptions.LOGIN_USER_NOT_FOUND}`, statusCodes.NOT_FOUND)})()
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            (()=>{ throw raiseCustomException(`${statusMessages.LOGIN_FAILED} ${statusDescriptions.LOGIN_WRONG_CREDENTAILS}`, statusCodes.UNAUTHORISED)})()
        }
        const accessToken = jwt.sign(UserSerializer(user), ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(UserSerializer(user), REFRESH_SECRET, { expiresIn: '1d' });
        logDebugToConsole("User Login Success: "+user.toString(), "success")
        res.status(statusCodes.SUCCESS).send({
            data: {...UserSerializer(user), accessToken: `Bearer ${accessToken}`, refreshToken: refreshToken},
            success: true,
            message: statusMessages.LOGIN_SUCCESS
        });
    }catch(err){
        logDebugToConsole("User Login Error: "+err.toString(), "error")
        if(err.type && err.type==="custom"){
            res.status(err.code).send({
                success: false,
                message: err.message
            });
        }else{
            res.status(statusCodes.SERVER_ERROR).send({
                data: err,
                success: false,
                message: statusMessages.INTERNAL_SERVER_ERROR+err.toString()
            });
        } 
    }
};
const generateToken = async(req, res) => {
    try {
        logDebugToConsole("Access Token Object: "+req.toString(), "info")
        const { refreshToken } = req;
        if (!refreshToken) {
            (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_TOKEN_FAILED} ${statusDescriptions.REFRESH_TOKEN_MANDATORY}`, statusCodes.BAD_REQUEST)})()
        }
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            (()=>{ throw raiseCustomException(`${statusMessages.ACCESS_TOKEN_FAILED} ${statusDescriptions.REFRESH_TOKEN_EXPIRED}`, statusCodes.TOKEN_EXPIRED)})()
        }
        const accessToken = jwt.sign(UserSerializer(user), ACCESS_SECRET, { expiresIn: '15m' });
        logDebugToConsole("Access Token Success: "+user.toString(), "success")
        res.status(statusCodes.SUCCESS).send({
            data: {...UserSerializer(user), accessToken: `Bearer ${accessToken}`, refreshToken: refreshToken},
            success: true,
            message: statusMessages.LOGIN_SUCCESS
        });
        } catch (err) {
            logDebugToConsole("User Login Error: "+err.toString(), "error")
            if(err.type && err.type==="custom"){
                res.status(err.code).send({
                    success: false,
                    message: err.message
                });
            }else{
                res.status(statusCodes.SERVER_ERROR).send({
                    data: err,
                    success: false,
                    message: statusMessages.INTERNAL_SERVER_ERROR+err.toString()
                });
            } 
        }
}



module.exports = { createSuperAdmin, loginUser, generateToken }