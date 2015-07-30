
//@todo the jsonschema is validating when it shouldn't by my testing.  See https://github.com/tdegrunt/jsonschema/issues/136

var AbstractMessage = require('../AbstractMessage') ;

/**
 * This message is a generic confirmation from the last request
 * You can set a confirmation code where 0 is OK, and other numbers represent
 * different error states.  There is also a string message field which can be
 * used to present an error message to the user.
 *
 * @param {Integer} code The confirmation code (if undefined, then 0 - OK)
 * @param {String} message The confirmation message string (if undefined, then "")
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {ConfirmMessage} An instance
 */
var ConfirmMessage = function(args)
{
	AbstractMessage.call(this,args) ;
	this.set(args) ;
} ;

/**
 * ConfirmMessage is a subclass of AbstractMessage
 */
ConfirmMessage.prototype = Object.create(AbstractMessage.prototype) ;

/**
 * Set the confirmation code for this message object
 *
 * @param {Integer} code The confirmation code value (if not set default 0 - OK)
 * 
 * @public
 *
 * @returns {ConfirmMessage} Returns instance of self
 */
ConfirmMessage.prototype.setCode = function(code)
{
	if (code !== undefined)
		this.data.confirm.code = code ;
	return this ;
} ;

/**
 * Get the confirmation code for this message object
 *
 * @public
 * @returns {Integer} The confirmation code value
 */
ConfirmMessage.prototype.getCode = function()
{
	return this.data.confirm.code ;
} ;

/**
 * Set the confirmation message for this message object.  No message means OK
 *
 * @param {Integer} code The confirmation code value (if not set default 0 - OK)
 * 
 * @public
 *
 * @returns {ConfirmMessage} Returns instance of self
 */
ConfirmMessage.prototype.setMessage = function(message)
{
	if (message !== undefined)
		this.data.confirm.message = message ;
	return this ;
} ;

/**
 * Get the confirmation message for this message object
 *
 * @public
 * @returns {String} The confirmation message value
 */
ConfirmMessage.prototype.getMessage = function()
{
	return this.data.confirm.message ;
} ;

/**
 * The type of this class
 * @public 
 */
ConfirmMessage.prototype.type = 'ConfirmMessage' ;

/**
 * Data structure for this message
 * @private
 */
ConfirmMessage.prototype.data =
{
	"confirm": { }
} ;

/**
 * Data structure for json validation of message data property
 * @private
 */
ConfirmMessage.prototype.schema =
{
	"id": "http://jsonschema.net/data",
	"type": "object",
	"properties": {
		"confirm": {
			"id": "http://jsonschema.net/data/confirm",
			"type": "object",
			"properties": {
				"code": {
					"id": "http://jsonschema.net/data/confirm/code",
					"type": "integer"
				},
				"message": {
					"id": "http://jsonschema.net/data/confirm/message",
					"type": "string"
				}
			},
			"required": ['code','message']
		}
	},
	"required": ['confirm']
} ;

module.exports = ConfirmMessage ;

