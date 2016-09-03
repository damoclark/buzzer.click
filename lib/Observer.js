var Participant = require('./Participant');

/**
 * Observer module.
 * @extends Participant
 * @module observer
 */

/**
 * Represents a observer participant.
 * @public
 * @constructor
 */
function Observer() {

}

/**
 * Prototype name
 */
Observer.prototype.type = 'Observer';

Observer.prototype = Object.create(Participant.prototype);
Observer.prototype.constructor = Observer;

//Export the class
module.exports = Observer;
