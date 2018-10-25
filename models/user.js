const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{ type:String ,required:true,unique:true},
    password: {type:String ,required:true,minlength:1,trim:true}
});

UserSchema.methods.toJSON=function(){
    var user = this;
    return {id:user.id,email: user.email};
}

const model = mongoose.model('user',UserSchema);

module.exports = model;