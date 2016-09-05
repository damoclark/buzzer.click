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
Object.defineProperty(HostBuzzerResetMessage.prototype, 'state', {
    get: function () {
        return this.data._state;
    },
    set: function (state) {
        if (typeof (state) === 'number'){
            this.data._state = state;
        }
        return this;
    }
});

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
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_state': {
            'id': 'http://jsonschema.net/data/_state',
            'type': 'integer'
        }
    },
    'required': [
        '_state'
    ]
};

module.exports = HostBuzzerResetMessage;
