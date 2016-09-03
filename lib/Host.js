var Participant = require('./Participant');

/**
 * Host module.
 * @extends Participant
 * @module host
 */

/**
 * Represents a host participant.
 * @constructor
 */
function Host() {

}

/**
 * Prototype name
 */
Host.prototype.type = 'Host';

Host.prototype = Object.create(Participant.prototype);
Host.prototype.constructor = Host;

//Export the class
module.exports = Host;
