var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the contestant join response message
 * or if not set, can be set using the various set methods:
 *  setWasSuccessful(result) : void
 *  setErrorMessage(errorMessage) : void
 *  setParticipantId(participantId) : void
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {ContestantJoinResponseMessage} An instance
 */
var ContestantJoinResponseMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * ContestantJoinResponseMessage is a subclass of AbstractMessage
 */
ContestantJoinResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the was successful status for this message object
 *
 * @param {Boolean} response The "was successful" response flag
 * 
 * @public
 */
ContestantJoinResponseMessage.prototype.setWasSuccessful = function(response) {
    if (response)
        this.data.successful = response;
    return this;
};

/**
 * Get the successful status for this message object
 *
 * @public
 */
ContestantJoinResponseMessage.prototype.getWasSuccessful = function() {
    return this.data.successful;
};

/**
 * Set the Error Message for this message object
 *
 * @param {String} errorMessage The username string
 * 
 * @public
 */
ContestantJoinResponseMessage.prototype.setErrorMessage = function(errorMessage) {
    if (errorMessage)
        this.data.errormessage = errorMessage;
    return this;
};

/**
 * Get the Error Message for this message object
 *
 * @public
 */
ContestantJoinResponseMessage.prototype.getErrorMessage = function() {
    return this.data.errormessage;
};


/**
 * Set the participant ID for this message object
 *
 * @param {String} participantId The participant ID string
 * 
 * @public
 */
ContestantJoinResponseMessage.prototype.setParicipantId = function(participantId) {
    if (participantId)
        this.data.participantid = participantId;
    return this;
};

/**
 * Get the participant ID for this message object
 *
 * @public
 */
ContestantJoinResponseMessage.prototype.getParticipantId = function() {
    return this.data.participantid;
};

/**
 * The type of this class
 * @public 
 */
ContestantJoinResponseMessage.prototype.type = 'ContestantJoinResponseMessage';

/**
 * Data structure for this message
 * @private
 */
ContestantJoinResponseMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
ContestantJoinResponseMessage.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "successful": {
            "id": "http://jsonschema.net/data/successful",
            "type": "boolean"
        },
        "errormessage": {
            "id": "http://jsonschema.net/data/errormessage",
            "type": "string"
        },
        "participantid": {
            "id": "http://jsonschema.net/data/participantid",
            "type": "string"
        }
    },
    "required": [
        "sessionid",
        "errormessage",
        "participantid"
    ]
};

module.exports = ContestantJoinResponseMessage;