var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');
var Settings = require('../Settings');

/**
 * This message is from client to server and provides the settings for a
 * new Session
 * @extends AbstractMessage
 * @returns {CreateSessionMessage} An instance
 */
var CreateSessionMessage = function(args) {
    this.type = CreateSessionMessage.prototype.type;
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * CreateSessionMessage is a subclass of AbstractMessage
 */
CreateSessionMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class
 * @public
 */
CreateSessionMessage.prototype.type = 'CreateSessionMessage';

/**
 * This method will set the Settings object that informs this CreateGame
 * Message object
 * @param {Settings} settings The settings object to be sent by the Message
 * @public
 */
Object.defineProperty(CreateSessionMessage.prototype, 'settings', {
    get: function() {
        return this.data._settings;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, Settings)) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._settings = val;
    }
});



/**
 * Data structure for json validation of message data property
 * @private
 */
CreateSessionMessage.prototype.schema = {
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        'settings': {
            'id': 'http://jsonschema.net/data/name',
            'type': 'object'
        }
    },
    'required': [
        'settings'
    ]
};

module.exports = CreateSessionMessage;
