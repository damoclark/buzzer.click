var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the host create response
 * or if not set, can be set using the setSession method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {HostSessionCreateResponse} An instance
 */
var HostSessionCreateResponse = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * HostSessionCreateResponse is a subclass of AbstractMessage
 */
HostSessionCreateResponse.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the session id for this message object
 *
 * @param {String} id The session id string
 * 
 * @public
 */
HostSessionCreateResponse.prototype.setSessionId = function(id) {
    if (id)
        this.data.sessionid = id;
    return this;
};

/**
 * Get the session id for this message object
 *
 * @public
 */
InquireTeamLeaderPositionMessage.prototype.getSessionId = function() {
    return this.data.id;
};

/**
 * The type of this class
 * @public 
 */
HostSessionCreateResponse.prototype.type = 'HostSessionCreateResponse';

/**
 * Data structure for this message
 * @private
 */
HostSessionCreateResponse.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
HostSessionCreateResponse.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "sessionid": {
            "id": "http://jsonschema.net/data/sessionid",
            "type": "string"
        }
    },
    "required": [
        "sessionid"
    ]
};

module.exports = HostSessionCreateResponse;