var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message to set the team name.
 * @extends AbstractMessage
 * @returns {SetTeamNameRequestMessage}
 */
var SetTeamNameRequestMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * SetTeamNameRequestMessage is a subclass of AbstractMessage.
 */
SetTeamNameRequestMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
SetTeamNameRequestMessage.prototype.type = 'SetTeamNameRequestMessage';

/**
 * Sets or gets the teamName.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the teamName.
 * @return {String} the teamName.
 */
Object.defineProperty(SetTeamNameRequestMessage.prototype, 'teamName', {
    get: function() {
        return this.data._teamName;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._teamName = val;
    }
});

/**
 * Data structure for json validation of message data property
 * @private
 */
SetTeamNameRequestMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_teamName': {
            'type': 'string'
        },
    },
    'required': [
        '_teamName',
    ]
};

module.exports = SetTeamNameRequestMessage;
