var ParamCheck = require('./ParamCheck');
var Participant = require('./Participant');

function Observer() {

}

Observer.prototype.type = 'Observer';
Observer.prototype = Object.create(Participant.prototype);
Observer.prototype.constructor = Observer;

//Export the class
module.exports = Observer;
