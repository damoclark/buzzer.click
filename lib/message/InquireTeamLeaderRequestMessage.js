var AbstractMessage = require('./AbstractMessage');

/**
 * Represents a message to inquire about being a team leader.
 * @extends AbstractMessage
 * @returns {InquireTeamLeaderRequestMessage}
 */
var InquireTeamLeaderRequestMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * InquireTeamLeaderRequestMessage is a subclass of AbstractMessage.
 */
InquireTeamLeaderRequestMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
InquireTeamLeaderRequestMessage.prototype.type = 'InquireTeamLeaderRequestMessage';

/**
 * Data structure for json validation of message data property
 * @private
 */
InquireTeamLeaderRequestMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {},
    'required': []
};

module.exports = InquireTeamLeaderRequestMessage;
