var AbstractMessage = require('./AbstractMessage');

/**
 * Represents a message to convey a contestant buzzer press.
 * @extends AbstractMessage
 * @returns {SuccessMessage}
 */
var ContestantBuzzerPress = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ContestantBuzzerPress is a subclass of AbstractMessage.
 */
ContestantBuzzerPress.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
ContestantBuzzerPress.prototype.type = 'ContestantBuzzerPress';

/**
 * Data structure for json validation of message data property
 * @private
 */
ContestantBuzzerPress.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {},
    'required': []
};

module.exports = ContestantBuzzerPress;
