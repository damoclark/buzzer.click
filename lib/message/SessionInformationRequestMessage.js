var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a request message to send session information.
 * @extends AbstractMessage
 * @returns {SessionInformationRequestMessage}
 */
var SessionInformationRequestMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * SessionInformationRequestMessage is a subclass of AbstractMessage.
 */
SessionInformationRequestMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
SessionInformationRequestMessage.prototype.type = 'SessionInformationRequestMessage';

/**
 * Sets or gets the participant id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the participant id.
 * @return {String} the participant id.
 */
Object.defineProperty(SessionInformationRequestMessage.prototype, 'participantId', {
    get: function() {
        return this.data._participantId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._participantId = val;
    }
});

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the session id.
 * @return {String} the session id.
 */
Object.defineProperty(SessionInformationRequestMessage.prototype, 'sessionId', {
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
SessionInformationRequestMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_participantId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        }
    },
    'required': [
        '_sessionId'
    ]
};

module.exports = SessionInformationRequestMessage;
