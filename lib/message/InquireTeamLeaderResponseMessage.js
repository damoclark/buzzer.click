var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message to response to an inquiry about being a team leader.
 * @extends AbstractMessage
 * @returns {InquireTeamLeaderResponseMessage}
 */
var InquireTeamLeaderResponseMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * InquireTeamLeaderResponseMessage is a subclass of AbstractMessage.
 */
InquireTeamLeaderResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
InquireTeamLeaderResponseMessage.prototype.type = 'InquireTeamLeaderResponseMessage';

/**
 * Sets or gets the decision.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {Boolean} the decision.
 * @return {Boolean} the decision.
 */
Object.defineProperty(InquireTeamLeaderResponseMessage.prototype, 'decision', {
    get: function() {
        return this.data._decision;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Boolean')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._decision = val;
    }
});

/**
 * Sets or gets the contestant id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the contestant id.
 * @return {String} the contestant id.
 */
Object.defineProperty(InquireTeamLeaderResponseMessage.prototype, 'contestantId', {
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
Object.defineProperty(InquireTeamLeaderResponseMessage.prototype, 'sessionId', {
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
InquireTeamLeaderResponseMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_decision': {
            'type': 'boolean'
        },
        '_contestantId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        }
    },
    'required': [
        '_decision', '_contestantId', '_sessionId'
    ]
};

module.exports = InquireTeamLeaderResponseMessage;
