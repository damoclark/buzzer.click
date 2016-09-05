var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from client to server and provides the participant join request message
 * or if not set, can be set using the various set methods:
 *  setSessionId(sessionId) : void
 *  setParticipantId(participantId) : void
 *  setUsername(username) : void
 *  setIsObserver(value) : void
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
ParticipantJoinRequestMessage.prototype.setSessionId = function(sessionId) {
    if (sessionId)
        this.data.sessionid = sessionId;
    return this;
};

/**
 * Get the session ID for this message object
 *
 * @public
 */
ParticipantJoinRequestMessage.prototype.getSessionId = function() {
    return this.data.sessionid;
};

/**
 * Set the participant ID for this message object
 *
 * @param {String} participantId The participant ID string
 * 
 * @public
 */
ParticipantJoinRequestMessage.prototype.setParicipantId = function(participantId) {
    if (participantId)
        this.data.participantid = participantId;
    return this;
};

/**
 * Get the participant ID for this message object
 *
 * @public
 */
ParticipantJoinRequestMessage.prototype.getParticipantId = function() {
    return this.data.participantid;
};

/**
 * Set the username for this message object
 *
 * @param {String} username The username string
 * 
 * @public
 */
ParticipantJoinRequestMessage.prototype.setUsername = function(userName) {
    if (userName)
        this.data.username = userName;
    return this;
};

/**
 * Get the username for this message object
 *
 * @public
 */
ParticipantJoinRequestMessage.prototype.getUsername = function() {
    return this.data.username;
};

/**
 * Set the "is observer" flag for this message object
 *
 * @param {Boolean} value The "is observer" boolean
 * 
 * @public
 */
ParticipantJoinRequestMessage.prototype.setIsObserver = function(value) {
    if (value)
        this.data.isobserver = value;
    return this;
};

/**
 * Get the observer flag for this message object
 *
 * @public
 */
ParticipantJoinRequestMessage.prototype.getIsObserver = function() {
    return this.data.isobserver;
};

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
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "sessionid": {
            "id": "http://jsonschema.net/data/sessionid",
            "type": "string"
        },
        "participantid": {
            "id": "http://jsonschema.net/data/participantid",
            "type": "string"
        },
        "username": {
            "id": "http://jsonschema.net/data/username",
            "type": "string"
        },
        "isobserver": {
            "id": "http://jsonschema.net/data/isobserver",
            "type": "boolean"
        }
    },
    "required": [
        "sessionid",
        "participantid",
        "username",
        "isobserver"
    ]
};

module.exports = ParticipantJoinRequestMessage;