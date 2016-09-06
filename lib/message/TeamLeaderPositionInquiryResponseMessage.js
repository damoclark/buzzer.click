var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the team leader status of the client
 * or if not set, can be set using the response method
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
Object.defineProperty(TeamLeaderPositionInquiryResponseMessage.prototype, 'response', {
    get: function () {
        return this.data._accepted;
    },
    set: function (accepted) {
        if (typeof (accepted) === 'boolean'){
            this.data._accepted = accepted;
        }
        return this;
    }
});

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
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_accepted': {
            'id': 'http://jsonschema.net/data/_accepted',
            'type': 'boolean'
        }
    },
    'required': [
        '_accepted'
    ]
};

module.exports = TeamLeaderPositionInquiryResponseMessage;
