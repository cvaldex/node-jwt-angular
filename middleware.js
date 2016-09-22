var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "No Authorization Header Request"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = "";

  try{
    payload = jwt.decode(token, config.TOKEN_SECRET);
  } catch (err) {
    return res
        .status(401)
       .send({message: "Token expired"});
  }

  if(payload.exp <= moment().unix()) {
     return res
         .status(401)
        .send({message: "Token expired"});
  }

  req.user = payload.sub;
  next();
}
