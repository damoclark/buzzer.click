var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from client to server and provides the settings for a new
 * Game
 *
 * @param {Settings} settings The settings instance for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {CreateGameMessage} An instance
 */
var CreateGameMessage = function(settings) {
    AbstractMessage.call(this, settings);
    this.set(settings);
};

/**
 * CreateGameMessage is a subclass of AbstractMessage
 */
CreateGameMessage.prototype = Object.create(AbstractMessage.prototype);


/**
 * This method will set the Settings object that informs this CreateGame
 * Message object
 *
 * @param {Settings} settings The settings object to be sent by the Message
 * @public
 */
Object.defineProperty(CreateGameMessage.prototype, 'settings', {
    get: function () {
        return this.get();
    },
    set: function (settings) {
        if (settings.type === 'Settings'){
            return this.set(settings);
        } else {
            throw new Error('parameter not type of "Settings"');
        }
    }
});


/**
 * The type of this class
 * @public
 */
CreateGameMessage.prototype.type = 'CreateGameMessage';

/**
 * Data structure for this message
 * @private
 */
CreateGameMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
CreateGameMessage.prototype.schema = {
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        'name': {
            'id': 'http://jsonschema.net/data/name',
            'type': 'string'
        },
        'teams': {
            'id': 'http://jsonschema.net/data/teams',
            'type': 'boolean'
        },
        'timelimit': {
            'id': 'http://jsonschema.net/data/timelimit',
            'type': 'integer'
        }
    },
    'required': [
        'name'
    ]
};

module.exports = CreateGameMessage;
