const { DB_ENC_KEY, REQ_RES_ENC_KEY, DB_ENC, REQ_RES_ENC } = require("../constants/AppConstants");
const { statusCodes, statusMessages } = require("../constants/MessageConstants");
const { encryptData, decryptData } = require("../utils/AppUtils");

const DBDataEncDecMiddleware = (schema, fields) => {
    schema.pre('save', function(next) {
        applyEncryption(this, fields);
        next();
    });
    schema.post('save', function(doc) {
        applyDecryption(doc, fields);
    });
    schema.post('init', function(doc) {
        applyDecryption(doc, fields);
    });
    schema.pre('findOneAndUpdate', function(next) {
        applyEncryption(this.getUpdate(), fields)
        next();
    });
};

const applyEncryption = (doc, fieldsToEncrypt) => {
    fieldsToEncrypt.forEach(field => {
        if (doc && doc[field]) {
            doc[field] = encryptData(JSON.stringify(doc[field]), DB_ENC_KEY, DB_ENC);
        }
    });
};
const applyDecryption = (doc, fieldsToDecrypt) => {
    fieldsToDecrypt.forEach(field => {
        if (doc && doc[field]) {
            doc[field] = decryptData(doc[field], DB_ENC_KEY, DB_ENC);
        }
    });
};
const DecryptRequestMiddleware = (req, res, next) => {
    if (req.headers['content-type'] === 'application/json' && req.body){
        try {
            req.body = REQ_RES_ENC? JSON.parse(decryptData(req.body,REQ_RES_ENC_KEY, REQ_RES_ENC)) : req.body;
        } catch (err) {
            console.log(err)
            return res.status(statusCodes.BAD_REQUEST).json({
                data: err,
                success: false,
                message: statusMessages.INVALID_ENC_REQUEST
            });
        }
    }
    next();
}
const EncryptResponseMiddleware = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        const encryptedData = encryptData(data, REQ_RES_ENC_KEY, REQ_RES_ENC);
        res.set('Content-Type', 'application/json');
        originalSend.call(this, encryptedData);
    };
    next();
}


module.exports = { DBDataEncDecMiddleware, DecryptRequestMiddleware, EncryptResponseMiddleware };