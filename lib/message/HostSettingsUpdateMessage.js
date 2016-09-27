var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents a message to set the team name.
 * @extends AbstractMessage
 * @returns {HostSettingsUpdateMessage}
 */
var HostSettingsUpdateMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * HostSettingsUpdateMessage is a subclass of AbstractMessage.
 */
HostSettingsUpdateMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
HostSettingsUpdateMessage.prototype.type = 'HostSettingsUpdateMessage';

/**
 * Sets or gets the sessionName.
 * @public
 * @throw on set val when param is an incorrect type.
 * @param {String} the sessionName.
 * @return {String} the sessionName.
 */
Object.defineProperty(HostSettingsUpdateMessage.prototype, 'sessionName', {
    get: function() {
        return this.data._sessionName;
    },
    set: function(val) {
        if (val && !new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._sessionName = val;
    }
});

/**
 * Sets or gets the maxTeams.
 * @public
 * @throw on set val when param is an incorrect type.
 * @param {Number} the maxTeams.
 * @return {Number} the maxTeams.
 */
Object.defineProperty(HostSettingsUpdateMessage.prototype, 'maxTeams', {
    get: function() {
        return this.data._maxTeams;
    },
    set: function(val) {
        if (val && !new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._maxTeams = val;
    }
});

/**
 * Sets or gets the teamSize.
 * @public
 * @throw on set val when param is an incorrect type.
 * @param {Number} the teamSize.
 * @return {Number} the teamSize.
 */
Object.defineProperty(HostSettingsUpdateMessage.prototype, 'teamSize', {
    get: function() {
        return this.data._teamSize;
    },
    set: function(val) {
        if (val && !new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._teamSize = val;
    }
});

/**
 * Sets or gets the maxContestants.
 * @public
 * @throw on set val when param is an incorrect type.
 * @param {Number} the maxContestants.
 * @return {Number} the maxContestants.
 */
Object.defineProperty(HostSettingsUpdateMessage.prototype, 'maxContestants', {
    get: function() {
        return this.data._maxContestants;
    },
    set: function(val) {
        if (val && !new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._maxContestants = val;
    }
});

/**
 * Sets or gets the host id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the host id.
 * @return {String} the host id.
 */
Object.defineProperty(HostSettingsUpdateMessage.prototype, 'hostId', {
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
Object.defineProperty(HostSettingsUpdateMessage.prototype, 'sessionId', {
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
HostSettingsUpdateMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_sessionName': {
            'type': 'string'
        },
        '_maxTeams': {
            'type': 'number'
        },
        '_teamSize': {
            'type': 'number'
        },
        '_maxContestants': {
            'type': 'number'
        },
        '_hostId': {
            'type': 'string'
        },
        '_sessionId': {
            'type': 'string'
        }
    },
    'required': [
        '_hostId', '_sessionId'
    ]
};

module.exports = HostSettingsUpdateMessage;
