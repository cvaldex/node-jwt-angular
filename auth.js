//var mongoose = require('mongoose');
//var User = mongoose.model('User');
var service = require('./service');

/*
exports.emailSignup = function(req, res) {
    var user = new User({
        // Creamos el usuario con los campos
        // que definamos en el Schema
        // nombre, email, etc...
    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};

exports.emailLogin = function(req, res) {
        return res
            .status(200)
            .send({token: service.createToken()});
};
*/
