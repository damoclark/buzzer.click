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
 * Sets or gets the contestant id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the contestant id.
 * @return {String} the contestant id.
 */
Object.defineProperty(SetTeamNameRequestMessage.prototype, 'contestantId', {
    get: function() {
        return this.data._contestantId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._contestantId = val;
    }
});

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the session id.
 * @return {String} the session id.
 */
Object.defineProperty(SetTeamNameRequestMessage.prototype, 'sessionId', {
    get: function() {
        return this.data._sessionId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._sessionId = val;
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
        '_contestantId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        }
    },
    'required': [
        '_teamName', '_contestantId', '_sessionId'
    ]
};

module.exports = SetTeamNameRequestMessage;
