var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the team leader status of the client
 * or if not set, can be set using the setResponse method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {TeamLeaderPositionInquiryResponseMessage} An instance
 */
var TeamLeaderPositionInquiryResponseMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * TeamLeaderPositionInquiryResponseMessage is a subclass of AbstractMessage
 */
TeamLeaderPositionInquiryResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the client accepted response for this message object
 *
 * @param {Boolean} accepted true or false to accept or reject team leader status
 * 
 * @public
 */
TeamLeaderPositionInquiryResponseMessage.prototype.setResponse = function(accepted) {
    if (accepted)
        this.data.accepted = accepted;
    return this;
};

/**
 * Get the client response for this message object
 *
 * @public
 */
InquireTeamLeaderPositionMessage.prototype.getResponse = function() {
    return this.data.accepted;
};

/**
 * The type of this class
 * @public 
 */
TeamLeaderPositionInquiryResponseMessage.prototype.type = 'TeamLeaderPositionInquiryResponseMessage';

/**
 * Data structure for this message
 * @private
 */
TeamLeaderPositionInquiryResponseMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
TeamLeaderPositionInquiryResponseMessage.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "accepted": {
            "id": "http://jsonschema.net/data/accepted",
            "type": "boolean"
        }
    },
    "required": [
        "accepted"
    ]
};

module.exports = TeamLeaderPositionInquiryResponseMessage;