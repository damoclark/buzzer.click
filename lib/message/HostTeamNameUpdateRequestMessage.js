var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message to set the team name.
 * @extends AbstractMessage
 * @returns {HostTeamNameUpdateRequestMessage}
 */
var HostTeamNameUpdateRequestMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * HostTeamNameUpdateRequestMessage is a subclass of AbstractMessage.
 */
HostTeamNameUpdateRequestMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
HostTeamNameUpdateRequestMessage.prototype.type = 'HostTeamNameUpdateRequestMessage';

/**
 * Sets or gets the teamNameFrom.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the teamNameFrom.
 * @return {String} the teamNameFrom.
 */
Object.defineProperty(HostTeamNameUpdateRequestMessage.prototype, 'teamNameFrom', {
    get: function() {
        return this.data._teamNameFrom;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._teamNameFrom = val;
    }
});

/**
 * Sets or gets the teamNameTo.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the teamNameTo.
 * @return {String} the teamNameTo.
 */
Object.defineProperty(HostTeamNameUpdateRequestMessage.prototype, 'teamNameTo', {
    get: function() {
        return this.data._teamNameTo;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._teamNameTo = val;
    }
});

/**
 * Sets or gets the host id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the host id.
 * @return {String} the host id.
 */
Object.defineProperty(HostTeamNameUpdateRequestMessage.prototype, 'hostId', {
    get: function() {
        return this.data._hostId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._hostId = val;
    }
});

/**
 * Sets or gets the session id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the session id.
 * @return {String} the session id.
 */
Object.defineProperty(HostTeamNameUpdateRequestMessage.prototype, 'sessionId', {
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
HostTeamNameUpdateRequestMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_teamNameFrom': {
            'type': 'string'
        },
        '_teamNameTo': {
            'type': 'string'
        },
        '_hostId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        }
    },
    'required': [
        '_teamNameFrom', '_teamNameTo', '_hostId', '_sessionId'
    ]
};

module.exports = HostTeamNameUpdateRequestMessage;
