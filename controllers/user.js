const userModel = require('../models/user');
const authUtils = require('../utils/auth');
const tokenUtil = require('../utils/token');

var getUserInfo = (req, res) => {

    userModel.findById( req.user.id,(err,user)=>{

        if(!err){
            res.status(200).send(user);
        }else{
            res.status(500).send(err);
        }

    });
   


}

var signup = (req, res) => {

    var body = req.body;
    body.password = authUtils.hashPassword(body.password);

    let newUser = new userModel(req.body);

    newUser.save((err, row) => {

        if (!err) {
            res.status(200).send('Saved Sucessfully');
        } else {
            res.status(500).send(err);
        }
    });

}

var signin = (req, res) => {

    userModel.findOne({ email: req.body.email }, (err, user) => {

        if (!err) {

            var hashPassword = authUtils.hashPassword(req.body.password);
            if (hashPassword === user.password) {

                tokenUtil.encodeToken(user.id, (err, token) => {

                    if (!err)
                        res.status(200).header("authorization", token).send('login succesfully');
                    else
                        res.status(500).send('error generating the token');
                });
            } else {
                res.status(401).send('Bad Credentials');
            }

        } else {
            res.status(401).send('Bad Credentials');
        }

    });




}


module.exports = {
    getUserInfo,
    signup,
    signin
}