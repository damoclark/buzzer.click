var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the buzzer state message
 * or if not set, can be set using the setEnabled method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {BuzzerStateMessage} An instance
 */
var BuzzerStateMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * BuzzerStateMessage is a subclass of AbstractMessage
 */
BuzzerStateMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the buzzer enabled state for this message object
 *
 * @param {Boolean} enabled The state of the buzzer boolean
 * 
 * @public
 */
BuzzerStateMessage.prototype.setEnabled = function(enabled) {
    if (enabled)
        this.data.enabled = enabled;
    return this;
};

/**
 * Get the session id for this message object
 *
 * @public
 */
InquireTeamLeaderPositionMessage.prototype.getEnabled = function() {
    return this.data.enabled;
};

/**
 * The type of this class
 * @public 
 */
BuzzerStateMessage.prototype.type = 'BuzzerStateMessage';

/**
 * Data structure for this message
 * @private
 */
BuzzerStateMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
BuzzerStateMessage.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "enabled": {
            "id": "http://jsonschema.net/data/enabled",
            "type": "boolean"
        }
    },
    "required": [
        "enabled"
    ]
};

module.exports = BuzzerStateMessage;