var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from client to server and provides the team name of the client
 * or if not set, can be set using the seTeamName method if client is a team leader or host
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {RequestTeamNameMessage} An instance
 */
var RequestTeamNameMessage = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
};

/**
 * RequestTeamNameMessage is a subclass of AbstractMessage
 */
RequestTeamNameMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the team name for this message object
 *
 * @param {String} teamName The team name string
 * 
 * @public
 */
RequestTeamNameMessage.prototype.setTeamName = function(teamName) {
    if (teamName)
        this.data.teamname = teamName;
    return this;
};

/**
 * Get the team name for this message object
 *
 * @public
 */
RequestTeamNameMessage.prototype.getTeamName = function() {
    return this.data.teamname;
};

/**
 * The type of this class
 * @public 
 */
RequestTeamNameMessage.prototype.type = 'RequestTeamNameMessage';

/**
 * Data structure for this message
 * @private
 */
RequestTeamNameMessage.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
RequestTeamNameMessage.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "teamname": {
            "id": "http://jsonschema.net/data/teamname",
            "type": "string"
        }
    },
    "required": [
        "teamname"
    ]
};

module.exports = RequestTeamNameMessage;