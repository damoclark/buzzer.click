var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the winner information message
 * or if not set, can be set using the various set methods:
 *  username(userName) : void
 *  userId(userId) : void
 *  teamName(teamName) : void
 *  teamId(teamId) : void
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {RoundWonMessage} An instance
 */
var RoundWonMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * RoundWonMessage is a subclass of AbstractMessage
 */
RoundWonMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the username for this message object
 *
 * @param {String} username The username string
 *
 * @public
 */
Object.defineProperty(RoundWonMessage.prototype, 'username', {
    get: function () {
        return this.data._username;
    },
    set: function (username) {
        if (username) {
            this.data._username = username;
        }
        return this;
    }
});

/**
 * Set the user ID for this message object
 *
 * @param {String} userId The user ID string
 * 
 * @public
 */
Object.defineProperty(RoundWonMessage.prototype, 'userId', {
    get: function () {
        return this.data._userid;
    },
    set: function (userId) {
        if (userId) {
            this.data._userid = userId;
        }
        return this;
    }
});

/**
 * Set the team name for this message object
 *
 * @param {String} teamName The team name string
 *
 * @public
 */
Object.defineProperty(RoundWonMessage.prototype, 'teamName', {
    get: function () {
        return this.data._teamname;
    },
    set: function (teamName) {
        if (teamName) {
            this.data._teamname = teamName;
        }
        return this;
    }
});

/**
 * Set the team id for this message object
 *
 * @param {String} teamId The team id string
 * 
 * @public
 */
Object.defineProperty(RoundWonMessage.prototype, 'teamId', {
    get: function () {
        return this.data._teamid;
    },
    set: function (teamId) {
        if (teamId) {
            this.data._teamid = teamId;
        }
        return this;
    }
});

/**
 * The type of this class
 * @public
 */
RoundWonMessage.prototype.type = 'RoundWonMessage';

/**
 * Data structure for this message
 * @private
 */
RoundWonMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
RoundWonMessage.prototype.schema = {
    'id': 'http://jsonschema.net/data',
    'type': 'object',
    'properties': {
        '_username': {
            'id': 'http://jsonschema.net/data/_username',
            'type': 'string'
        },
        '_userid': {
            'id': 'http://jsonschema.net/data/_userid',
            'type': 'string'
        },
        '_teamname': {
            'id': 'http://jsonschema.net/data/_teamname',
            'type': 'string'
        },
        '_teamid': {
            'id': 'http://jsonschema.net/data/_teamid',
            'type': 'string'
        }
    },
    'required': [
        '_username',
        '_userid',
        '_teamname',
        '_teamid'
    ]
};

module.exports = RoundWonMessage;
