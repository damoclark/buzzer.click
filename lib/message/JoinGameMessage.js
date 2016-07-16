
//@todo the jsonschema is validating when it shouldn't by my testing.  See https://github.com/tdegrunt/jsonschema/issues/136

var AbstractMessage = require('../AbstractMessage') ;

/**
 * This message is from client to server and provides the gamecode of the client
 * or if not set, can be set using the setGameCode method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {JoinGameMessage} An instance
 */
var JoinGameMessage = function(args)
{
	AbstractMessage.call(this,args) ;
	this.set(args) ;
} ;

/**
 * JoinGameMessage is a subclass of AbstractMessage
 */
JoinGameMessage.prototype = Object.create(AbstractMessage.prototype) ;

/**
 * Set the client gamecode for this message object
 *
 * @param {String} gamecode The game code string
 * 
 * @public
 */
JoinGameMessage.prototype.setGameCode = function(gamecode)
{
	if (gamecode)
		this.data.gamecode = gamecode ;
	return this ;
} ;

/**
 * Get the client gamecode for this message object
 *
 * @public
 */
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
{ } ;

/**
 * Data structure for json validation of message data property
 * @private
 */
JoinGameMessage.prototype.schema =
{
	"id": "http://jsonschema.net/data",
	"type": "object",
	"properties": {
		"gamecode": {
			"id": "http://jsonschema.net/data/gamecode",
			"type": "string"
		}
	},
	"required": [
		"gamecode"
	]
} ;

module.exports = JoinGameMessage ;
