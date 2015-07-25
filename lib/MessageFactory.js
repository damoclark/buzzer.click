
var console = require('console') ;
var fs = new require('fs') ;

//A hash of class name and require'd constructors for AbstractMessage objects
var classes = { } ;


//Load all message objects
var messageClasses = fs.readdirSync(__dirname+'/message') ;
console.log(messageClasses) ;
var me = this ;
messageClasses.forEach
(
	function(filename)
	{
		//Strip off .js from filename to reveal the class name
		className = filename.replace(/\.js$/,'') ;
		console.log(className) ;
		console.log(__dirname+'/message/'+filename) ;
		//Load the class into the property validMessages by its class name
		classes[className] = require(__dirname+'/message/'+filename) ;
	}
) ;

//Export all the Message Types
for(var m in classes)
{
	exports[m] = classes[m] ;
}

/**
 * Given json object received from remote endpoint, return a subclass of
 * AbstractMessage representing this message.  Null if there is an validation
 * error
 *
 * @param {Object|String} data JSON from client/server
 *
 * @return {AbstractMessage} message object from json data
 */
function restore(data)
{
	var name = data.type ;

	return create(name,data) ;
}

/**
 * Create a new message object by the given name, and optionally initialised
 * with the values in the Object args, and return it.  Null if there was an
 * error
 *
 * @param {String} name Name of the message object to create
 * @param {Object} args Optional initial values to set for this instance
 *
 * @returns {AbstractMessage} The message
 */
function create(name,args)
{
	//If data is a string and exists as a class name, use that name
	if (classes[name] === undefined)
		throw ("Invalid message class " + name) ;

	return new classes[name](args) ;
}

//Export the module functions
exports.restore = restore ;
exports.create = create ;

