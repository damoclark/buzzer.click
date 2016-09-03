var ParamCheck = require('./ParamCheck');
var Participant = require('./Participant');

function Host() {

}

Host.prototype.type = 'Host';
Host.prototype = Object.create(Participant.prototype);
Host.prototype.constructor = Host;

//Export the class
module.exports = Host;
