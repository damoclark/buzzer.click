var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents message which is used to convey the buzzer state.
 * @extends AbstractMessage
 * @returns {ErrorMessage}
 */
var BuzzerStateMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * BuzzerStateMessage is a subclass of AbstractMessage.
 */
BuzzerStateMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
BuzzerStateMessage.prototype.type = 'BuzzerStateMessage';

/**
 * Sets or gets the error.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the error.
 * @return {String} the error.
 */
Object.defineProperty(BuzzerStateMessage.prototype, 'state', {
    get: function() {
        return this.data._state;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._state = val;
    }
});

/**
 * Data structure for json validation of message data property
 * @private
 */
BuzzerStateMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_state': {
            'type': 'number',
            'minimum': 0,
            'maximum': 2,
        },
    },
    'required': [
        '_state',
    ]
};

module.exports = BuzzerStateMessage;
