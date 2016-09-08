var AbstractMessage = require('./AbstractMessage');

/**
 * This message is from client to server or server to client as specifies an error, usually in the form of a response.
 * @extends AbstractMessage
 * @returns {SuccessMessage}
 */
var SuccessMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ErrorMessage is a subclass of AbstractMessage.
 */
SuccessMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
SuccessMessage.prototype.type = 'SuccessMessage';


/**
 * Data structure for json validation of message data property
 * @private
 */
SuccessMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
    },
    'required': [
    ]
};

module.exports = SuccessMessage;
