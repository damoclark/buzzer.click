var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * This message is from server to client and provides a response
 * to the @see {@link CreateSessionMessage}.
 * @extends AbstractMessage
 * @returns {CreateSessionResponseMessage} An instance
 */
var CreateSessionResponseMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * CreateSessionResponseMessage is a subclass of AbstractMessage
 */
CreateSessionResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class
 * @public
 */
CreateSessionResponseMessage.prototype.type = 'CreateSessionResponseMessage';

/**
 * Set the session id for this message object
 * @param {String} id The session id string
 * @public
 */
Object.defineProperty(CreateSessionResponseMessage.prototype, 'sessionId', {
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
 * Set the host id for this message object
 * @param {String} id The session id string
 * @public
 */
Object.defineProperty(CreateSessionResponseMessage.prototype, 'hostId', {
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
 * Data structure for json validation of message data property
 * @private
 */
CreateSessionResponseMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_hostId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        },
    },
    'required': [
        '_hostId', '_sessionId'
    ]
};

module.exports = CreateSessionResponseMessage;
