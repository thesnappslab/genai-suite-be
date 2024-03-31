const mongoose = require("mongoose");
const { statusMessages, statusDescriptions, statusCodes } = require("../constants/MessageConstants");
const Tenant = require("../models/Tenant");
const { raiseCustomException, logDebugToConsole, encryptDBData } = require("../utils/AppUtils");
const { TenantSerializer } = require("../serializers/TenantSerializer");

const addTenant = async(req, res) => {
    try{
        logDebugToConsole("Add Tenant Object: "+req.toString(), "info")
        const tenantRequest= new Tenant(
            {
                name: req.name? req.name : (()=>{ throw raiseCustomException(`${statusMessages.ADD_TENANT_FAILED} ${statusDescriptions.TENANT_NAME_MANDATORY}`, statusCodes.BAD_REQUEST)})(),
                theme: req.theme? req.theme : null,
                domain: req.domain? req.domain : (()=> { throw raiseCustomException(`${statusMessages.ADD_TENANT_FAILED} ${statusDescriptions.TENANT_DOMAIN_MANDATORY}`, statusCodes.BAD_REQUEST)})(),
                subscription: req.subscription? (req.subscription) : null,
                validity: req.validity? req.validity : null,
                orgDocument: req.orgDocument? req.orgDocument : (()=> { throw raiseCustomException(`${statusMessages.ADD_TENANT_FAILED} ${statusDescriptions.TENANT_DOCUMENT_MANDATORY}`, statusCodes.BAD_REQUEST)})(),
                noOfUsers: req.noOfUsers? req.noOfUsers : null,
                paymentType: req.paymentType? req.paymentType : null,
                paymentMode: req.paymentMode? req.paymentMode : null,
                serviceEndpoints: req.serviceEndpoints? (req.serviceEndpoints) : (()=> { throw raiseCustomException(`${statusMessages.ADD_TENANT_FAILED} ${statusDescriptions.TENANT_SERVICE_ENDPOINTS_MANDATORY}`, statusCodes.BAD_REQUEST)})(),
                createdBy: req.user ? encryptDBData(mongoose.Types.ObjectId(req.user._id)) : (()=> { throw raiseCustomException(`${statusMessages.ADD_TENANT_FAILED} ${statusDescriptions.NO_LOGGED_IN_USER_DETAILS}`, statusCodes.FORBIDDEN)})(),
                updatedBy: req.user ? encryptDBData(mongoose.Types.ObjectId(req.user._id)) : (()=> { throw raiseCustomException(`${statusMessages.ADD_TENANT_FAILED} ${statusDescriptions.NO_LOGGED_IN_USER_DETAILS}`, statusCodes.FORBIDDEN)})(),
            }
        );
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
const getTenants = async(req, res) => {
    try{
        const tenants= await Tenant.find();
        logDebugToConsole("Get Tenant Success: "+tenants.toString(), "success")
        res.status(statusCodes.SUCCESS).send({
            data: tenants.map((obj)=>{
                return TenantSerializer(obj)
            }),
            success: true,
            message: statusMessages.GET_TENANTS_SUCCESS
        });
    }catch(err){
        logDebugToConsole("Get Tenants Error: "+err.toString(), "error")
        res.status(statusCodes.SERVER_ERROR).send({
            data: err,
            success: false,
            message: statusMessages.INTERNAL_SERVER_ERROR
        });
    }
};
const getTenant = async(id, res) => {
    try{
        logDebugToConsole(`Get Tenant id: ${id}`, "info")
        let tenant= null;
        id ? tenant= await Tenant.findById(id) : (()=>{ throw raiseCustomException(`${statusMessages.GET_TENANT_FAILED} ${statusDescriptions.TENANT_ID_MISSING}`, statusCodes.BAD_REQUEST)})();
        logDebugToConsole("Get Tenant Success: "+tenant, "success")
        res.status(statusCodes.SUCCESS).send({
            data: TenantSerializer(tenant),
            success: true,
            message: statusMessages.GET_TENANT_SUCCESS
        });
    }catch(err){
        logDebugToConsole("GET Tenant Error: "+err.toString(), "error")
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
const editTenant = async(id, req, res) => {
    try{
        logDebugToConsole(`Edit Tenant <${id}> Object: `+req, "info")
        const filter= {
            "_id": id, 
        };
        const tenant = await Tenant.findOneAndUpdate(filter, req, {new: true});
        logDebugToConsole("Edit Tenant Success: "+tenant.toString(), "success")
        res.status(statusCodes.SUCCESS).send({
            data: TenantSerializer(tenant),
            success: true,
            message: statusMessages.EDIT_TENANT_SUCCESS
        });
    }catch(err){
        logDebugToConsole("Edit Tenant Error: "+err.toString(), "error")
        res.status(statusCodes.SERVER_ERROR).send({
            data: err,
            success: false,
            message: statusMessages.INTERNAL_SERVER_ERROR+err.toString()
        });
    }
};
module.exports = { addTenant, getTenants, getTenant, editTenant }