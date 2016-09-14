var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message to convey a contestant buzzer press.
 * @extends AbstractMessage
 * @returns {SuccessMessage}
 */
var ContestantBuzzerPressMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ContestantBuzzerPressMessage is a subclass of AbstractMessage.
 */
ContestantBuzzerPressMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
ContestantBuzzerPressMessage.prototype.type = 'ContestantBuzzerPressMessage';

/**
 * Sets or gets the contestant id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the contestant id.
 * @return {String} the contestant id.
 */
Object.defineProperty(ContestantBuzzerPressMessage.prototype, 'contestantId', {
    get: function() {
        return this.data._contestantId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._contestantId = val;
    }
});

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the session id.
 * @return {String} the session id.
 */
Object.defineProperty(ContestantBuzzerPressMessage.prototype, 'sessionId', {
    get: function() {
        return this.data._sessionId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._sessionId = val;
    }
});

/**
 * Data structure for json validation of message data property
 * @private
 */
ContestantBuzzerPressMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_contestantId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        }
    },
    'required': [
        '_contestantId', '_sessionId'
    ]
};

module.exports = ContestantBuzzerPressMessage;
