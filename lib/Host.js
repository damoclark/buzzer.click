var Participant = require('./Participant');

/**
 * Host module.
 * @module host
 */

/**
 * Represents a host participant.
 * @extends Participant
 * @public
 * @constructor
 */
function Host() {

}

/**
 * Prototype name
 */
Host.prototype.type = 'Host';

/**
 * Contestant is a subclass of Participant.
 */
Host.prototype = Object.create(Participant.prototype);
Host.prototype.constructor = Host;

//Export the class
module.exports = Host;
