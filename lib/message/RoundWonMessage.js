var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the winner information message
 * or if not set, can be set using the various set methods:
 *  setWinnerUsername(userName) : void
 *  setWinnerUserId(userId) : void
 *  setWinnerTeamName(teamName) : void
 *  setWinnerTeamId(teamId) : void
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
 * @param {String} userName The username string
 * 
 * @public
 */
RoundWonMessage.prototype.setWinnerUsername = function(userName) {
    if (userName)
        this.data.username = userName;
    return this;
};

/**
 * Get the username for this message object
 *
 * @public
 */
RoundWonMessage.prototype.getWinnerUsername = function() {
    return this.data.username;
};

/**
 * Set the user ID for this message object
 *
 * @param {String} userId The user ID string
 * 
 * @public
 */
RoundWonMessage.prototype.setWinnerUserId = function(userId) {
    if (userId)
        this.data.userid = userId;
    return this;
};

/**
 * Get the user ID for this message object
 *
 * @public
 */
RoundWonMessage.prototype.getWinnerUserId = function() {
    return this.data.userid;
};

/**
 * Set the team name for this message object
 *
 * @param {String} teamName The team name string
 * 
 * @public
 */
RoundWonMessage.prototype.setWinnerTeamName = function(teamName) {
    if (teamName)
        this.data.teamname = teamName;
    return this;
};

/**
 * Get the team name for this message object
 *
 * @public
 */
RoundWonMessage.prototype.getTeamName = function() {
    return this.data.teamname;
};

/**
 * Set the team id for this message object
 *
 * @param {String} teamId The team id string
 * 
 * @public
 */
RoundWonMessage.prototype.setWinnerTeamId = function(teamId) {
    if (teamId)
        this.data.teamid = teamId;
    return this;
};

/**
 * Get the observer flag for this message object
 *
 * @public
 */
RoundWonMessage.prototype.getWinnerTeamId = function() {
    return this.data.teamid;
};

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
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "username": {
            "id": "http://jsonschema.net/data/username",
            "type": "string"
        },
        "userid": {
            "id": "http://jsonschema.net/data/userid",
            "type": "string"
        },
        "teamname": {
            "id": "http://jsonschema.net/data/teamname",
            "type": "string"
        },
        "teamid": {
            "id": "http://jsonschema.net/data/teamid",
            "type": "string"
        }
    },
    "required": [
        "username",
        "userid",
        "teamname",
        "teamid"
    ]
};

module.exports = RoundWonMessage;