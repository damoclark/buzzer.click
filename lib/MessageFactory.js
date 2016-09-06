var CreateGameMessage = require('./message/CreateGameMessage');

/**
 * Message factory module.
 * @module messageFactory
 */

/**
 * Represents a message factory.
 * @public
 * @constructor
 */
function MessageFactory() {

}

/**
 * Prototype name
 */
MessageFactory.prototype.type = 'MessageFactory';

/**
 * Defines a property to get a new @See {@link CreateGameMessage} instance.
 * @public
 * @throws on set value.
 * @return {CreateGameMessage} instance.
 */
Object.defineProperty(MessageFactory.prototype, 'CreateGameMessage', {
    get: function() {
        return new CreateGameMessage();
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});


//Export the class
module.exports = new MessageFactory();
