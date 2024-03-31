const { info, success, error } = require("consola");
const bcrypt = require("bcryptjs");
const { EQUAL_USERNAME_EMAIL, SUPER_ADMIN_FIRST_NAME, SUPER_ADMIN_LAST_NAME, SUPER_ADMIN_EMAIL, SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_GENDER } = require("../constants/AppConstants");
const User = require("../models/User");
const { raiseCustomException } = require("../utils/AppUtils");

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
            (()=>{ throw raiseCustomException(`${statusMessages.ADD_TENANT_FAILED} ${statusDescriptions.TENANT_NAME_MANDATORY}`, statusCodes.BAD_REQUEST)})()
        }
        const tenant= await tenantRequest.save();
        logDebugToConsole("Add Tenant Success: "+tenant.toString(), "success")
        res.status(statusCodes.SUCCESS).send({
            data: TenantSerializer(tenant),
            success: true,
            message: statusMessages.ADD_TENANT_SUCCESS
        });
    }catch(err){
        logDebugToConsole("Add Tenant Error: "+err.toString(), "error")
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


module.exports = { createSuperAdmin, loginUser }