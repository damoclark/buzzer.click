

var AbstractMessage = require('../AbstractMessage') ;

/**
 * This message is from client to server and provides the name of the client
 * or if not set, can be set using the setName method
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {RegisterNameMessage} An instance
 */
var RegisterNameMessage = function(args)
{
	this.set(args) ;
} ;

/**
 * RegisterNameMessage is a subclass of AbstractMessage
 */
RegisterNameMessage.prototype = new AbstractMessage() ;

/**
 * Set the client name for this message object
 *
 * @param {String} name The name of the client to set to
 * 
 * @public
 */
RegisterNameMessage.prototype.setName = function(name)
{
	if (name)
		this.data.name = name ;
	return this ;
} ;

/**
 * Get the client name for this message object
 *
 * @public
 */
RegisterNameMessage.prototype.getName = function()
{
	return this.data.name ;
} ;

/**
 * The type of this class
 * @public 
 */
RegisterNameMessage.prototype.type = 'RegisterNameMessage' ;

/**
 * Data structure for this message
 * @private
 */
RegisterNameMessage.prototype.data =
{
	"type": RegisterNameMessage.prototype.type 
} ;

/**
 * Data structure for json validation of message
 * @private
 */
RegisterNameMessage.prototype.schema =
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://jsonschema.net",
  "type": "object",
  "properties": {
    "type": {
      "id": "http://jsonschema.net/type",
      "type": "string",
			"pattern": "^" + RegisterNameMessage.prototype.type + "$"
    },
    "name": {
      "id": "http://jsonschema.net/name",
      "type": "string"
    }
  },
  "required": [
    "type",
    "name"
  ]
} ;

module.exports = RegisterNameMessage ;

