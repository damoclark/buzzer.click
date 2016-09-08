var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * This message is from client to server and requests that the client rejoin a session.
 * @extends AbstractMessage
 * @returns {RejoinSessionMessage}
 */
var RejoinSessionMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * RejoinSessionMessage is a subclass of AbstractMessage.
 */
RejoinSessionMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
RejoinSessionMessage.prototype.type = 'RejoinSessionMessage';

/**
 * Sets or gets the join as type.
 * @public
 * @param {Number} the join as type.
 * @return {Number} the join as type.
 */
Object.defineProperty(RejoinSessionMessage.prototype, 'rejoinAs', {
    get: function() {
        return this.data._rejoinAs;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._rejoinAs = val;
    }
});

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the session id.
 * @return {String} the session id.
 */
Object.defineProperty(RejoinSessionMessage.prototype, 'sessionId', {
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
 * Sets or gets the participant id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the participant id.
 * @return {String} the participant id.
 */
Object.defineProperty(RejoinSessionMessage.prototype, 'participantId', {
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
 * Data structure for json validation of message data property
 * @private
 */
RejoinSessionMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_rejoinAs': {
            'type': 'number',
            'minimum': 1,
            'maximum': 3,
        },
        '_participantId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        },
    },
    'required': [
        '_rejoinAs', '_participantId', '_sessionId'
    ]
};

module.exports = RejoinSessionMessage;
