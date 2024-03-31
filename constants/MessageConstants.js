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
    INTERNAL_SERVER_ERROR: "Something went wrong. Please try again after sometime. If persists, please contact admin.",
    INVALID_ENC_REQUEST: "Invalid Encrypted Request."
};
const statusDescriptions= {
    TENANT_NAME_MANDATORY: "Tenant Name is a mandatory field.",
    TENANT_DOMAIN_MANDATORY: "Tenant Domain is a mandatory field.",
    TENANT_DOCUMENT_MANDATORY: "Supporting document for the tenant is required.",
    TENANT_SERVICE_ENDPOINTS_MANDATORY: "Tenant Service Endpoints are to be mandatorily configured.",
    TENANT_ID_MISSING: "No Tenant ID is mentioned.",
    LOGIN_CREDENTIALS_MANDATORY: "Username/Email and Password are mandatory for login.",
    LOGIN_USER_NOT_FOUND: "User with the given Username/Email is not found. Please check your credentials.",
    NO_LOGGED_IN_USER_DETAILS: "Logged in user details are missing."
};
const statusCodes= {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    SUCCESS: 200,
    UNAUTHORISED: 401,
    TOKEN_EXPIRED: 412
};

module.exports = {
    statusMessages, statusDescriptions ,statusCodes
};