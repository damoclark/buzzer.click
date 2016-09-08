var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');
var Settings = require('../Settings');

/**
 * This message is from client to server and provides the settings for a
 * new session.
 * @extends AbstractMessage
 * @returns {CreateSessionMessage}
 */
var CreateSessionMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * CreateSessionMessage is a subclass of AbstractMessage.
 */
CreateSessionMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
CreateSessionMessage.prototype.type = 'CreateSessionMessage';

/**
 * Sets or gets the settings.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {Settings} the settings.
 * @return {Settings} the settings.
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
 * Defines a custom restore routine that @see {@link MessageFactory} will
 * call, when present, when restoring a message.
 * @public
 */
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
