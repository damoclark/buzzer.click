var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message to response to an inquiry about being a team leader.
 * @extends AbstractMessage
 * @returns {InquireTeamLeaderRequestResponseMessage}
 */
var InquireTeamLeaderRequestResponseMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * InquireTeamLeaderRequestResponseMessage is a subclass of AbstractMessage.
 */
InquireTeamLeaderRequestResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
InquireTeamLeaderRequestResponseMessage.prototype.type = 'InquireTeamLeaderRequestResponseMessage';

/**
 * Sets or gets the decision.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {Boolean} the decision.
 * @return {Boolean} the decision.
 */
Object.defineProperty(InquireTeamLeaderRequestResponseMessage.prototype, 'decision', {
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
 * Data structure for json validation of message data property
 * @private
 */
InquireTeamLeaderRequestResponseMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_decision': {
            'type': 'boolean'
        },
    },
    'required': [
        '_decision',
    ]
};

module.exports = InquireTeamLeaderRequestResponseMessage;
