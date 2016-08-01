var ConfirmMessage = require('./ConfirmMessage');

/**
 * This message is a confirmation response for a CreateGameMessage
 * You can set a confirmation code where 0 is OK, and other numbers represent
 * different error states.  There is also a string message field which can be
 * used to present an error message to the user.
 *
 * @param {Integer} code The confirmation code (if undefined, then 0 - OK)
 * @param {String} message The confirmation message string (if undefined, then "")
 * @param {Object} args The data for this message object
 *
 * @extends ConfirmMessage
 *
 * @returns {CreateGameConfirmMessage} An instance
 */
var CreateGameConfirmMessage = function(args) {
    ConfirmMessage.call(this, args);
    this.set(args);
};

/**
 * CreateGameConfirmMessage is a subclass of ConfirmMessage
 */
CreateGameConfirmMessage.prototype = Object.create(ConfirmMessage.prototype);

/**
 * The type of this class
 * @public 
 */
CreateGameConfirmMessage.prototype.type = 'CreateGameConfirmMessage';

module.exports = CreateGameConfirmMessage;