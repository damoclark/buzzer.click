var ParamCheck = require('./ParamCheck');
var Participant = require('./Participant');

function Contestant() {

}

Contestant.prototype.type = 'Contestant';

Contestant.prototype = Object.create(Participant.prototype);
Contestant.prototype.constructor = Contestant;

//Export the class
module.exports = Contestant;
