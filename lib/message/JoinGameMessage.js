var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from client to server and provides the gamecode of the client
 * or if not set, can be set using the setGameCode method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {JoinGameMessage} An instance
 */
var JoinGameMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * JoinGameMessage is a subclass of AbstractMessage
 */
JoinGameMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the client gamecode for this message object
 *
 * @param {String} gameCode The game code string
 *
 * @public
 */
Object.defineProperty(JoinGameMessage.prototype, 'gameCode', {
    get: function () {
        return this.data._gamecode;
    },
    set: function (gameCode) {
        if (gameCode) {
            this.data._gamecode = gameCode;
        }
        return this;
    }
});

/**
 * The type of this class
 * @public
 */
JoinGameMessage.prototype.type = 'JoinGameMessage';

/**
 * Data structure for this message
 * @private
 */
JoinGameMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
JoinGameMessage.prototype.schema = {
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_gamecode': {
            'id': 'http://jsonschema.net/data/_gamecode',
            'type': 'string'
        }
    },
    'required': [
        '_gamecode'
    ]
};

module.exports = JoinGameMessage;
