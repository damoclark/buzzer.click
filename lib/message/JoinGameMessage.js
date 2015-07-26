
//@todo the jsonschema is validating when it shouldn't by my testing.  See https://github.com/tdegrunt/jsonschema/issues/136

var AbstractMessage = require(__dirname+'/../AbstractMessage') ;

/**
 * This message is from client to server and provides the gamecode of the client
 * or if not set, can be set using the setGameCode method
 *
 * @param {Object} args The data for this message object
 *
 * @returns {JoinGameMessage} An instance
 */
var JoinGameMessage = function(args)
{
	this.set(args) ;
} ;

/**
 * JoinGameMessage is a subclass of AbstractMessage
 */
JoinGameMessage.prototype = new AbstractMessage() ;

/**
 * Set the client gamecode for this message object
 * @public
 */
JoinGameMessage.prototype.setGameCode = function(gamecode)
{
	if (gamecode)
		this.data.gamecode = gamecode ;
	return this ;
} ;

JoinGameMessage.prototype.getGameCode = function()
{
	return this.data.gamecode ;
} ;

/**
 * The type of this class
 * @public 
 */
JoinGameMessage.prototype.type = 'JoinGameMessage' ;

/**
 * Data structure for this message
 * @private
 */
JoinGameMessage.prototype.data =
{
	"type": JoinGameMessage.prototype.type 
} ;

/**
 * Data structure for json validation of message
 * @private
 */
JoinGameMessage.prototype.schema =
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://jsonschema.net",
  "type": "object",
  "properties": {
    "type": {
      "id": "http://jsonschema.net/type",
      "type": "string",
			"pattern": "^" + JoinGameMessage.prototype.type + "$"
    },
    "gamecode": {
      "id": "http://jsonschema.net/gamecode",
      "type": "string"
    }
  },
  "required": [
    "type",
    "gamecode"
  ]
} ;

module.exports = JoinGameMessage ;

