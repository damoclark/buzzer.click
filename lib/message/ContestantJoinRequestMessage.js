var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represent a message which is used to request the joining of a session by a contestant.
 * @extends AbstractMessage
 * @returns {ContestantJoinRequestMessage}
 */
var ContestantJoinRequestMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ContestantJoinRequestMessage is a subclass of AbstractMessage
 */
ContestantJoinRequestMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class
 * @public
 */
ContestantJoinRequestMessage.prototype.type = 'ContestantJoinRequestMessage';

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the session id.
 * @return {String} the session id.
 */
Object.defineProperty(ContestantJoinRequestMessage.prototype, 'sessionId', {
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
 * Sets or gets the username id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the username.
 * @return {String} the username.
 */
Object.defineProperty(ContestantJoinRequestMessage.prototype, 'username', {
    get: function() {
        return this.data._username;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._username = val;
    }
});

/**
 * Data structure for json validation of message data property
 * @private
 */
ContestantJoinRequestMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_username': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        },
    },
    'required': [
        '_username', '_sessionId'
    ]
};

module.exports = ContestantJoinRequestMessage;
