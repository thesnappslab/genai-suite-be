const { model, Schema } = require('mongoose');
const Tenant = require('./Tenant');

const userSchema = new Schema(
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
            required: true,
        },
        username: {
            type: String,
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

module.exports = model('users', userSchema);