var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents message which is used to convey a buzzer related action command.
 * @extends AbstractMessage
 * @returns {ErrorMessage}
 */
var BuzzerActionCommandMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * BuzzerActionCommandMessage is a subclass of AbstractMessage.
 */
BuzzerActionCommandMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
BuzzerActionCommandMessage.prototype.type = 'BuzzerActionCommandMessage';

/**
 * Sets or gets the action.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the error.
 * @return {String} the error.
 */
Object.defineProperty(BuzzerActionCommandMessage.prototype, 'action', {
    get: function() {
        return this.data._action;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._action = val;
    }
});

/**
 * Sets or gets the host id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the error.
 * @return {String} the error.
 */
Object.defineProperty(BuzzerActionCommandMessage.prototype, 'hostId', {
    get: function() {
        return this.data._hostId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._hostId = val;
    }
});

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the error.
 * @return {String} the error.
 */
Object.defineProperty(BuzzerActionCommandMessage.prototype, 'sessionId', {
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
BuzzerActionCommandMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_hostId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        },
        '_action': {
            'type': 'number',
            'minimum': 0,
            'maximum': 4,
        },
    },
    'required': [
        '_action', '_hostId', '_sessionId',
    ]
};

module.exports = BuzzerActionCommandMessage;
