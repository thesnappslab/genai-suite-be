const {success, error, info, warn} = require("consola");
const forge = require("node-forge");

const raiseCustomException = (message, code) => {
    let error= new Error(message);
    error.code= code;
    error.type= "custom";
    return error;
}

const logDebugToConsole = (message, type) => {
    type==="success"&&success({message: message, badge: true});
    type==="error"&&error({message: message, badge: true});
    type==="warn"&&warn({message: message, badge: true});
    type==="info"&&info({message: message, badge: true});
}

const encryptData = (data, key, encReq) => {
    if(encReq){
        try{
            const cipher = forge.cipher.createCipher('AES-CBC', forge.util.createBuffer(key));
            const iv = forge.random.getBytesSync(16);
            cipher.start({ iv });
            if (typeof data === 'object') {
                cipher.update(forge.util.createBuffer(JSON.stringify(data), 'utf8'));
            } else {
                cipher.update(forge.util.createBuffer(data, 'utf8'));
            }
            cipher.finish();
            const encrypted = cipher.output.getBytes();
            return forge.util.bytesToHex(iv) + ':' + forge.util.bytesToHex(encrypted);
        }catch(err){
            console.log("Encryption Error:",err)
        }
    }else{
        return data
    }
}
const decryptData = (data, key, decReq) => {
    if(decReq){
        try{
            const decipher = forge.cipher.createDecipher('AES-CBC', forge.util.createBuffer(key));
            const parts = data.split(':');
            const iv = forge.util.hexToBytes(parts[0]);
            const encryptedBytes = forge.util.hexToBytes(parts[1]);
            decipher.start({ iv });
            decipher.update(forge.util.createBuffer(encryptedBytes));
            decipher.finish();
            const decrypted = decipher.output.toString();
            try {
                return JSON.parse(decrypted);
            } catch (error) {
                return decrypted;
            }
        }catch(err){
            console.log("Decryption Error:",err)
        }
    }else{
        return data
    }
}

module.exports = { raiseCustomException, logDebugToConsole, encryptData, decryptData }
