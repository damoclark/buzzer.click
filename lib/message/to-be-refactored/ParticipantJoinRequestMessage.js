var AbstractMessage = require('./AbstractMessage');

/**
 * This message is from client to server and provides the participant join request message
 * or if not set, can be set using the various set methods:
 *  sessionId(sessionId) : void
 *  participantId(participantId) : void
 *  username(username) : void
 *  isObserver(value) : void
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {ParticipantJoinRequestMessage} An instance
 */
var ParticipantJoinRequestMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * ParticipantJoinRequestMessage is a subclass of AbstractMessage
 */
ParticipantJoinRequestMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the session ID for this message object
 *
 * @param {String} sessionId The sessionId string
 *
 * @public
 */
Object.defineProperty(ParticipantJoinRequestMessage.prototype, 'sessionId', {
    get: function () {
        return this.data._sessionid;
    },
    set: function (sessionId) {
        if (sessionId) {
            this.data._sessionid = sessionId;
        }
        return this;
    }
});

/**
 * Set the participant ID for this message object
 *
 * @param {String} participantId The participant ID string
 * 
 * @public
 */
Object.defineProperty(ParticipantJoinRequestMessage.prototype, 'participantId', {
    get: function () {
        return this.data._participantid;
    },
    set: function (participantId) {
        if (participantId) {
            this.data._participantid = participantId;
        }
        return this;
    }
});

/**
 * Set the username for this message object
 *
 * @param {String} username The username string
 * 
 * @public
 */
Object.defineProperty(ParticipantJoinRequestMessage.prototype, 'username', {
    get: function () {
        return this.data._username;
    },
    set: function (username) {
        if (username) {
            this.data._username = username;
        }
        return this;
    }
});

/**
 * Set the 'is observer' flag for this message object
 *
 * @param {Boolean} value The 'is observer' boolean
 * 
 * @public
 */
Object.defineProperty(ParticipantJoinRequestMessage.prototype, 'isObserver', {
    get: function () {
        return this.data._isobserver;
    },
    set: function (value) {
        if (typeof (value) === 'boolean') {
            this.data._isobserver = value;
        }
        return this;
    }
});

/**
 * The type of this class
 * @public
 */
ParticipantJoinRequestMessage.prototype.type = 'ParticipantJoinRequestMessage';

/**
 * Data structure for this message
 * @private
 */
ParticipantJoinRequestMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
ParticipantJoinRequestMessage.prototype.schema = {
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_sessionid': {
            'id': 'http://jsonschema.net/data/_sessionid',
            'type': 'string'
        },
        '_participantid': {
            'id': 'http://jsonschema.net/data/_participantid',
            'type': 'string'
        },
        '_username': {
            'id': 'http://jsonschema.net/data/_username',
            'type': 'string'
        },
        '_isobserver': {
            'id': 'http://jsonschema.net/data/_isobserver',
            'type': 'boolean'
        }
    },
    'required': [
        '_sessionid',
        '_participantid',
        '_username',
        '_isobserver'
    ]
};

module.exports = ParticipantJoinRequestMessage;
