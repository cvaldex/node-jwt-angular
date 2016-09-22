// services.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.createToken = function() {
  var payload = {
    sub: "anonymous",
    iat: moment().unix(),
    exp: moment().add(30, "seconds").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};
