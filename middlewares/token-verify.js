const tokenUtil = require('../utils/token');

let verifyToken = (req,res,next)=>{

    var token = req.headers['authorization'];

    if(token){

        tokenUtil.verifyToken(token,(err,user)=>{

            if(!err){
                req.user = user;
                next();
            }else{
                res.status(403).send();
            }
            
        });

    }else{

        res.status(401).send('You have to provide token')

    }



}



module.exports = verifyToken;