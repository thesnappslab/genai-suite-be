const statusMessages= {
    ADD_TENANT_FAILED: "Tenant Addition Failed.",
    ADD_TENANT_SUCCESS: "Tenant Added Successfully.",
    EDIT_TENANT_FAILED: "Edit of Tenant Details Failed.",
    EDIT_TENANT_SUCCESS: "Tenant Details Edited Successfully.",
    GET_TENANTS_FAILED: "Fetching Tenants Failed.",
    GET_TENANTS_SUCCESS: "Tenants Fetched Successfully.",
    GET_TENANT_FAILED: "Fetching Tenant Details Failed.",
    GET_TENANT_SUCCESS: "Tenant Details Fetched Successfully.",
    LOGIN_SUCCESS: "User logged in successfully.",
    LOGIN_FAILED: "User Login Failed.",
    ACCESS_TOKEN_SUCCESS: "Access Token Generated Successfully.",
    ACCESS_TOKEN_FAILED: "Access Token Generation Failed.",
    ACCESS_DENIED: "Access Denied.",
    INTERNAL_SERVER_ERROR: "Something went wrong. Please try again after sometime. If persists, please contact admin.",
    INVALID_ENC_REQUEST: "Invalid Encrypted Request."
};
const statusDescriptions= {
    TENANT_NAME_MANDATORY: "Tenant Name is a mandatory field.",
    TENANT_DOMAIN_MANDATORY: "Tenant Domain is a mandatory field.",
    TENANT_DOCUMENT_MANDATORY: "Supporting document for the tenant is required.",
    TENANT_SERVICE_ENDPOINTS_MANDATORY: "Tenant Service Endpoints are to be mandatorily configured.",
    TENANT_ID_MISSING: "No Tenant ID is mentioned.",
    LOGIN_CREDENTIALS_MANDATORY: "Username/ Email and Password are mandatory for login.",
    LOGIN_USER_NOT_FOUND: "User with the given Username/Email is not found. Please check your credentials.",
    LOGIN_WRONG_CREDENTAILS: "Wrong Credentials entered.",
    REFRESH_TOKEN_MANDATORY: "Refresh Token Mandatory for generating Access Token.",
    REFRESH_TOKEN_EXPIRED: "Refresh Token Expired/ Invalidated.",
    ACCESS_TOKEN_MISSING: "Access Token not provided.",
    ACCESS_TOKEN_EXPIRED: "Access Token Expired/ Invalidated.",
    USER_DATA_MISSING: "User Data is missing.",
    USER_NOT_ACTIVATED: "User is not activated, please contact the admin.",
    USER_PWD_CHANGE: "Password change is required, please change password to proceed.",
    USER_NOT_AUTHORISED: "User not Authorised to perform this action. Elevation of role is required, please contact the Admin.",
    NO_LOGGED_IN_USER_DETAILS: "Logged in user details are missing."
};
const statusCodes= {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    SUCCESS: 200,
    UNAUTHORISED: 401,
    TOKEN_EXPIRED: 412,
    NOT_FOUND: 404,
    EXPECTATION_FAILED: 417
};

module.exports = {
    statusMessages, statusDescriptions ,statusCodes
};