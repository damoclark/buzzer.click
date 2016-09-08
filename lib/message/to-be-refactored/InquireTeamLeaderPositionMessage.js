var AbstractMessage = require('./AbstractMessage');

/**
 * This message is from client to server and provides the team leader status of the client
 * or if not set, can be set using the setResponse method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {InquireTeamLeaderPositionMessage} An instance
 */
var InquireTeamLeaderPositionMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * InquireTeamLeaderPositionMessage is a subclass of AbstractMessage
 */
InquireTeamLeaderPositionMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the client response for this message object
 *
 * @param {Boolean} response true or false to accept or reject team leader status
 *
 * @public
 */
Object.defineProperty(InquireTeamLeaderPositionMessage.prototype, 'response', {
    get: function () {
        return this.data._response;
    },
    set: function (response) {
        if (typeof (response) === 'boolean'){
            this.data._response = response;
        }
        return this;
    }
});

/**
 * The type of this class
 * @public
 */
InquireTeamLeaderPositionMessage.prototype.type = 'InquireTeamLeaderPositionMessage';

/**
 * Data structure for this message
 * @private
 */
InquireTeamLeaderPositionMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
InquireTeamLeaderPositionMessage.prototype.schema = {
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_response': {
            'id': 'http://jsonschema.net/data/_response',
            'type': 'boolean'
        }
    },
    'required': [
        '_response'
    ]
};

module.exports = InquireTeamLeaderPositionMessage;
