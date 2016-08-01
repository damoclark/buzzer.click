var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from client to server and provides the name of the client
 * or if not set, can be set using the setName method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {RegisterNameMessage} An instance
 */
var RegisterNameMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * RegisterNameMessage is a subclass of AbstractMessage
 */
RegisterNameMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the client name for this message object
 *
 * @param {String} name The name of the client to set to
 * 
 * @public
 */
RegisterNameMessage.prototype.setName = function(name) {
    if (name)
        this.data.name = name;
    return this;
};

/**
 * Get the client name for this message object
 *
 * @public
 */
RegisterNameMessage.prototype.getName = function() {
    return this.data.name;
};

/**
 * The type of this class
 * @public 
 */
RegisterNameMessage.prototype.type = 'RegisterNameMessage';

/**
 * Data structure for this message
 * @private
 */
RegisterNameMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
RegisterNameMessage.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "name": {
            "id": "http://jsonschema.net/data/name",
            "type": "string"
        }
    },
    "required": [
        "name"
    ]
};

module.exports = RegisterNameMessage;