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
Object.defineProperty(HostSessionCreateResponse.prototype, 'sessionId', {
    get: function () {
        return this.data._sessionid;
    },
    set: function (id) {
        if (id) {
            this.data._sessionid = id;
        }
        return this;
    }
});

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
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_sessionid': {
            'id': 'http://jsonschema.net/data/_sessionid',
            'type': 'string'
        }
    },
    'required': [
        '_sessionid'
    ]
};

module.exports = HostSessionCreateResponse;
