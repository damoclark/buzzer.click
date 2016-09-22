var AbstractMessage = require('./AbstractMessage');

/**
 * Represents a message to convey the session is completed.
 * @extends AbstractMessage
 * @returns {SessionCompleted}
 */
var SessionCompleted = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ErrorMessage is a subclass of AbstractMessage.
 */
SessionCompleted.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
SessionCompleted.prototype.type = 'SessionCompleted';

/**
 * Data structure for json validation of message data property
 * @private
 */
SessionCompleted.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {},
    'required': []
};

module.exports = SessionCompleted;
