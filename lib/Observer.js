var Participant = require('./Participant');

/**
 * Observer module.
 * @module observer
 */

/**
 * Represents a observer participant.
 * @extends Participant
 * @public
 * @constructor
 */
function Observer() {

}

/**
 * Prototype name
 */
Observer.prototype.type = 'Observer';

/**
 * Contestant is a subclass of Participant.
 */
Observer.prototype = Object.create(Participant.prototype);
Observer.prototype.constructor = Observer;

//Export the class
module.exports = Observer;
