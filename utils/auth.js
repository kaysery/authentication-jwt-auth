const crypto = require('crypto');
const config = require('../config/config');


var hashPassword = (password)=>{

    const hashedPassword = crypto.createHmac('sha256', config.password.saltkey)
        .update(password)
        .digest('hex');

        return hashedPassword;
}

module.exports = {
    hashPassword
}