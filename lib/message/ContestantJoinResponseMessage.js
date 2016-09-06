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
 * @param {Boolean} response The 'was successful' response flag
 *
 * @public
 */
Object.defineProperty(ContestantJoinResponseMessage.prototype, 'successful', {
    get: function () {
        return this.data._successful;
    },
    set: function (response) {
        if (typeof (response) === 'boolean') {
            this.data._successful = response;
        }
        return this;
    }
});

/**
 * Set the Error Message for this message object
 *
 * @param {String} errorMessage The username string
 *
 * @public
 */
Object.defineProperty(ContestantJoinResponseMessage.prototype, 'errorMessage', {
    get: function () {
        return this.data._errormessage;
    },
    set: function (errorMessage) {
        if (errorMessage) {
            this.data._errormessage = errorMessage;
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
Object.defineProperty(ContestantJoinResponseMessage.prototype, 'participantId', {
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
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_successful': {
            'id': 'http://jsonschema.net/data/_successful',
            'type': 'boolean'
        },
        '_errormessage': {
            'id': 'http://jsonschema.net/data/_errormessage',
            'type': 'string'
        },
        '_participantid': {
            'id': 'http://jsonschema.net/data/_participantid',
            'type': 'string'
        }
    },
    'required': [
        '_sessionid',
        '_errormessage',
        '_participantid'
    ]
};

module.exports = ContestantJoinResponseMessage;
