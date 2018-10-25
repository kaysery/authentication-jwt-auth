const jwt = require('jsonwebtoken');
const config = require('../config/config');



var verifyToken =  (token,callback)=> {
    jwt.verify(token, config.token.secretkey,callback);
}

var decodeToken = (token, callback) => {
    jwt.decode(token, config.token.secretkey,callback);
}


var encodeToken = (id, callback) => {
    jwt.sign({ id: id }, config.token.secretkey, { expiresIn: config.token.expirationtime }, callback);
}



module.exports = {
    decodeToken,
    encodeToken,
    verifyToken
}