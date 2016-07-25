
var ConfirmMessage = require('./ConfirmMessage') ;

/**
 * This message is sent in response to an invalid message received, typically
 * if it fails the jsonschema validation.
 * The code is set to 255, and message is empty string
 * 
 * @param {String} message The confirmation message string (if undefined, then "")
 * @param {Object} args The data for this message object
 *
 * @extends ConfirmMessage
 *
 * @returns {ProtocolErrorMessage} An instance
 */
var ProtocolErrorMessage = function(args)
{
	ConfirmMessage.call(this,args) ;
	this.set(args) ;
	//Make sure its 255
	this.data.confirm.code = 255 ;
} ;

/**
 * ProtocolErrorMessage is a subclass of ConfirmMessage
 */
ProtocolErrorMessage.prototype = Object.create(ConfirmMessage.prototype) ;

/**
 * Set the confirmation code for this message object (ignored, just sets to 255)
 *
 * @param {Integer} code This code is ignored, always code of 255
 * 
 * @public
 * 
 * @returns {Integer} The confirmation code value
 */
ProtocolErrorMessage.prototype.setCode = function(code)
{
	this.data.confirm.code = 255 ;
	return this ;
} ;

/**
 * Set the confirmation message for this message object.  No message means OK
 *
 * @param {Integer} code The confirmation code value (if not set default 0 - OK)
 * 
 * @public
 *
 * @returns {ProtocolErrorMessage} Returns instance of self
 */
ProtocolErrorMessage.prototype.setMessage = function(message)
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
ProtocolErrorMessage.prototype.getMessage = function()
{
	return this.data.confirm.message ;
} ;

/**
 * The type of this class
 * @public 
 */
ProtocolErrorMessage.prototype.type = 'ProtocolErrorMessage' ;

/**
 * Data structure for this message
 * @private
 */
ProtocolErrorMessage.prototype.data =
{
	"confirm": {
		"code": 255,
		"message": ""
	}
} ;

/**
 * Data structure for json validation of message data property is same
 * as ConfirmMessage
 * @private
 */
//ProtocolErrorMessage.prototype.schema =

module.exports = ProtocolErrorMessage ;

