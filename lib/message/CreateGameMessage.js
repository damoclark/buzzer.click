
//@todo the jsonschema is validating when it shouldn't by my testing.  See https://github.com/tdegrunt/jsonschema/issues/136

var AbstractMessage = require('../AbstractMessage') ;

/**
 * This message is from client to server and provides the settings for a new
 * Game
 *
 * @param {Settings} settings The settings instance for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {CreateGameMessage} An instance
 */
var CreateGameMessage = function(settings)
{
	AbstractMessage.call(this,settings) ;
	this.set(settings) ;
} ;

/**
 * CreateGameMessage is a subclass of AbstractMessage
 */
CreateGameMessage.prototype = Object.create(AbstractMessage.prototype) ;

/**
 * The type of this class
 * @public 
 */
CreateGameMessage.prototype.type = 'CreateGameMessage' ;

/**
 * Data structure for this message
 * @private
 */
CreateGameMessage.prototype.data =
{ } ;

/**
 * Data structure for json validation of message
 * @private
 */
CreateGameMessage.prototype.schema =
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://jsonschema.net",
  "type": "object",
  "properties": {
    "type": {
      "id": "http://jsonschema.net/type",
      "type": "string",
			"pattern": "^" + CreateGameMessage.prototype.type + "$"
		},
    "data": {
			"id": "http://jsonschema.net/data",
			"type": "object",
			"properties": {
				"name": {
					"id": "http://jsonschema.net/data/name",
					"type": "string"
        },
				"teams": {
					"id": "http://jsonschema.net/data/teams",
					"type": "boolean"
				},
				"timelimit": {
					"id": "http://jsonschema.net/data/timelimit",
					"type": "integer"
				}
      },
			"required": [
				"name"
			]
    }
  },
  "required": [
    "type",
    "data"
  ]
} ;

module.exports = CreateGameMessage ;

