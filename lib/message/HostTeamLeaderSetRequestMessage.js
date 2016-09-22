var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message to set the team leader.
 * @extends AbstractMessage
 * @returns {HostTeamLeaderSetRequestMessage}
 */
var HostTeamLeaderSetRequestMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * HostTeamLeaderSetRequestMessage is a subclass of AbstractMessage.
 */
HostTeamLeaderSetRequestMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
HostTeamLeaderSetRequestMessage.prototype.type = 'HostTeamLeaderSetRequestMessage';

/**
 * Sets or gets the teamName.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the teamName.
 * @return {String} the teamName.
 */
Object.defineProperty(HostTeamLeaderSetRequestMessage.prototype, 'teamName', {
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
 * Sets or gets the teamLeaderUsername.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the teamLeaderUsername.
 * @return {String} the teamLeaderUsername.
 */
Object.defineProperty(HostTeamLeaderSetRequestMessage.prototype, 'teamLeaderUsername', {
    get: function() {
        return this.data._teamLeaderUsername;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._teamLeaderUsername = val;
    }
});

/**
 * Sets or gets the host id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the host id.
 * @return {String} the host id.
 */
Object.defineProperty(HostTeamLeaderSetRequestMessage.prototype, 'hostId', {
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
Object.defineProperty(HostTeamLeaderSetRequestMessage.prototype, 'sessionId', {
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
HostTeamLeaderSetRequestMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_teamName': {
            'type': 'string'
        },
        '_teamLeaderUsername': {
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
        '_teamName', '_teamLeaderUsername', '_hostId', '_sessionId'
    ]
};

module.exports = HostTeamLeaderSetRequestMessage;
