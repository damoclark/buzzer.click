var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the host buzzer reset response
 * or if not set, can be set using the setState method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {HostBuzzerResetMessage} An instance
 */
var HostBuzzerResetMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * HostBuzzerResetMessage is a subclass of AbstractMessage
 */
HostBuzzerResetMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the state for this message object
 *
 * @param {Integer} state The state integer
 * 
 * @public
 */
HostBuzzerResetMessage.prototype.setState = function(state) {
    if (state)
        this.data.state = state;
    return this;
};

/**
 * Get the session id for this message object
 *
 * @public
 */
InquireTeamLeaderPositionMessage.prototype.getState = function() {
    return this.data.state;
};

/**
 * The type of this class
 * @public 
 */
HostBuzzerResetMessage.prototype.type = 'HostBuzzerResetMessage';

/**
 * Data structure for this message
 * @private
 */
HostBuzzerResetMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
HostBuzzerResetMessage.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "state": {
            "id": "http://jsonschema.net/data/state",
            "type": "integer"
        }
    },
    "required": [
        "state"
    ]
};

module.exports = HostBuzzerResetMessage;