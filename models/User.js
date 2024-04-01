const { model, Schema } = require('mongoose');
const Tenant = require('./Tenant');
const { DBDataEncDecMiddleware } = require('../middlewares/EncDecMiddleware');

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String, 
            required: true,
        },
        lastLoginTime: {
            type: Date,
        },
        isActivated: {
            type: Boolean,
            default: false,
            required: true,
        },
        forcePasswordChange: { 
            type: Boolean,
            default: false,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: 'user',
            enum: ['user', 'admin', 'superadmin']
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            required: true,
        },
        tenant:{
            type: Schema.Types.ObjectId,
            ref: Tenant,
        },
    },
    
    {timestamps: true}
);
DBDataEncDecMiddleware(UserSchema, ['firstname', 'lastname', 'gender', 'lastLoginTime']); 

module.exports = model('users', UserSchema);