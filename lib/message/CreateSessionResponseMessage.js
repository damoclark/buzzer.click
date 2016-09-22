var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message which is used to response to a @see {@link CreateSessionMessage} request.
 * @extends AbstractMessage
 * @returns {CreateSessionResponseMessage}
 */
var CreateSessionResponseMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * CreateSessionResponseMessage is a subclass of AbstractMessage.
 */
CreateSessionResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
CreateSessionResponseMessage.prototype.type = 'CreateSessionResponseMessage';

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the session id.
 * @return {String} the session id.
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
 * Sets or gets the host id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type. 
 * @param {String} the host id.
 * @return {String} the host id.
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
