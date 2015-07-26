
var validate = require('jsonschema').validate ;

/**
 * Abstract message class from which all socket.io message objects should derive
 * 
 */
var AbstractMessage = function()
{
	
} ;

/**
 * Validate the data datastructure for the instance or if provided
 * the data object that is passed to this method
 * 
 * @param   {Object} data data structure to be validated for this type of message
 * @public 
 * @returns {Boolean} True if valid, otherwise false
 */
AbstractMessage.prototype.validate = function(data)
{
	//If no data provided, validate the instance data
	if (data === undefined)
	{
		console.log('validating instance data') ;
		console.log('validating data=') ;
		console.log(this.data) ;
		console.log('against schema=') ;
		console.log(this.schema) ;
		return validate(this.data,this.schema) ;
	}

	//Otherwise, validate the data passed into method
	return validate(data,this.schema) ;
} ;

/**
 * Set the data for the message object to args, replacing the same values that
 * existed before
 * 
 * @param   {Object} args data to replace what is in this instance
 * @public 
 * @returns {AbstractMessage} Returns itself
 */
AbstractMessage.prototype.set = function(args)
{
	for(var p in args)
	{
		this.data[p] = args[p] ;
	}
	this.validate() ;
} ;

/**
 * Get the raw data from the message object
 * 
 * @returns {Object} Raw data object from message
 * @public
 */
AbstractMessage.prototype.get = function()
{
	return this.data ;
} ;

/**
 * Get the type of this message as a string
 *
 * @public
 * @returns {String} The type of this object as a string
 */
AbstractMessage.prototype.getType = function()
{
	return this.type ;
} ;

//Export the class
module.exports = AbstractMessage ;

