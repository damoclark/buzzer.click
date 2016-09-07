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
    AbstractMessage.call(this, args);
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

CreateSessionMessage.prototype.restore = function(data) {
    var settings = new Settings();
    for (var p in data._settings) {
        settings[p] = data._settings[p];
    }
    this.settings = settings;
};

/**
 * Data structure for json validation of message data property
 * @private
 */
CreateSessionMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_settings': {
            'id': 'http://jsonschema.net/data/name',
            'type': 'object',
            'properties': {
                '_hasTeams': {
                    'type': 'boolean'
                },
                '_teamSize': {
                    'type': 'number'
                },
                '_maxTeams': {
                    'type': 'number'
                },
                '_teamSelectionMethod': {
                    'type': 'number'
                },
                '_teamNameEdit': {
                    'type': 'number'
                },
                '_maxContestants': {
                    'type': 'number'
                },
            },
        }
    },
    'required': [
        '_settings'
    ]
};

module.exports = CreateSessionMessage;
