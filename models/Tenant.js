const { model, Schema } = require("mongoose")
const { APP_DEFAULT_THEME } = require("../constants/AppConstants");
const { DBDataEncDecMiddleware } = require("../middlewares/EncDecMiddleware");

const TenantSchema= new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        theme: {
            type: Object,
            default: APP_DEFAULT_THEME
        },
        domain: {
            type: String,
            unique: true,
            required: true,
        },
        subscription: {
            type: String,
        },
        validity: {
            type: Date,
        },
        orgDocument: {
            type: Object,
            required: true,
        },
        isActivated: {
            type: Boolean,
            default: false,
            required: true
        },
        noOfUsers: {
            type: Number,
        },
        paymentType: {
            type: String,
        },
        paymentMode: {
            type: String,
        },
        serviceEndpoints: {
            type: Object,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)
DBDataEncDecMiddleware(TenantSchema, ['name', 'theme', 'subscription', 'validity', 'orgDocument', 'noOfUsers', 'paymentType', 'paymentMode', 'serviceEndpoints']);


module.exports= model("tenants", TenantSchema);
